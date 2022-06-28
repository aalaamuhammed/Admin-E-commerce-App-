import { Form, Popconfirm, Table, Typography, Alert } from "antd";
import { useState, useEffect } from "react";
import { MarginSize, PaddingSize } from "../assets/Sizes";
import { Colors } from "../assets/Colors";
import EditableTableCell from "../components/EditableTableCell";
import {
  GetFromCart,
  DeleteFromCart,
  UpdateCart,
} from "../services/CartService";

function Cart({ setLoad }) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [cartItems, setCartItems] = useState();
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

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

  const fetchData = async () => {
    const data = await GetFromCart();
    console.log({ data });
    setCartItems(data);
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

  const handleDelete = (record) => {
    const isSuccess = DeleteFromCart(record);
    if (isSuccess) {
      const newData = cartItems.filter((item) => item.key !== record.key);
      setCartItems(newData);
      AlertHandler(isSuccess);
    } else {
      // TODO: Handle Alert
      AlertHandler(isSuccess);
    }
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...cartItems];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setCartItems(newData);
        setEditingKey("");
        let isSuccess = UpdateCart({ ...item, ...row });
        AlertHandler(isSuccess);
        setLoad(true);
      } else {
        newData.push(row);
        setCartItems(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      AlertHandler(false);
    }
  };

  const columns = [
    {
      title: "Product Details",
      dataIndex: "productDetails",
      width: "50%",
      render: (_, record) => {
        // TODO: Image Name Description
        return (
          <div style={{ display: "flex", flex: 1 }}>
            <div>
              <img
                src={`${record.productDetails.imageUrl}`}
                style={{ width: "130px" }}
              />
            </div>
            <div style={{ margin: "15px" }}>
              <p style={{ fontWeight: "bold" }}>{record.productDetails.name}</p>
              <p>{record.productDetails.description}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      width: "20%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <button
              style={{
                marginRight: MarginSize.md,
                border: "1px solid ",
                borderRadius: 5,
                color: Colors.primary,
                fontWeight: "bold",
                padding: PaddingSize.lg,
              }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </button>
            <button
              style={{
                marginRight: MarginSize.md,
                border: "1px solid ",
                borderRadius: 5,
                color: Colors.danger,
                fontWeight: "bold",
                padding: PaddingSize.lg,
              }}
              disabled={editingKey !== ""}
              onClick={() => handleDelete(record)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
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
          //  style={{ flex: 1, justifyContent: "center" }}
          size="large"
          dataSource={cartItems}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
}

export default Cart;
