import { Form, Table, Button, Alert } from "antd";
import { useState, useEffect } from "react";
import { MarginSize } from "../assets/Sizes";
import EditableTableCell from "../components/EditableTableCell";
import { GetColumns } from "../ColumnsConfiguration/ProductTableColumns";
import {
  DeleteProduct,
  getProduct,
  updateProduct,
} from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { AddToCart } from "../services/CartService";

const App = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getProduct(categoryId);
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      quantity: "",
      description: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleDelete = async (record) => {
    const newData = products.filter((item) => item.key !== record.key);
    const isSuccess = await DeleteProduct(record);
    AlertHandler(isSuccess);
    setProducts(newData);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const AlertHandler = (isSuccess) => {
    const alertData = {
      type: isSuccess ? "success" : "error",
      message: isSuccess ? "Success" : "Error",
      description: isSuccess ? "Successfully updated" : "Check your connection",
    };
    setType(alertData.type);
    setMessage(alertData.message);
    setDescription(alertData.description);
    setIsAlert(true);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...products];
      const index = newData.findIndex((item) => key === item.key);
      let isSuccess;
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setProducts(newData);
        setEditingKey("");
        isSuccess = await updateProduct({ ...item, ...row });
        AlertHandler(isSuccess);
      } else {
        newData.push(row);
        setProducts(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const addProduct = () => {
    navigate("/ProductForm");
  };
  return (
    <div style={{ flex: 1, overflowY: "scroll" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: MarginSize.xl,
        }}
      >
        <h2>{categoryName}</h2>
        <Button onClick={() => addProduct()} type="primary">
          Add Product
        </Button>
      </div>
      {isAlert ? (
        <Alert
          type={type}
          message={message}
          description={description}
          showIcon
          closable
          onClose={() => setIsAlert(false)}
        />
      ) : null}

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableTableCell,
            },
          }}
          bordered={true}
          style={{ flex: 1 }}
          dataSource={products}
          columns={GetColumns({
            save,
            isEditing,
            handleDelete,
            edit,
            cancel,
            AddToCart,
            editingKey,
          })}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default App;
