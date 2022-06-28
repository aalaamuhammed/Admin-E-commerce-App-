import React from "react";
import { Form, Table, Alert } from "antd";
import { useState, useEffect } from "react";
import { MarginSize } from "../assets/Sizes";
import EditableTableCell from "../components/EditableTableCell";
import { GetColumns } from "../ColumnsConfiguration/UserTableColumns";
import { DeleteUser, getUser, updateUser } from "../services/UserService";
import { AddToCart } from "../services/CartService";

function UsersList() {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const fetchData = async () => {
    const data = await getUser();
    setUsers(data);
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
    const newData = users.filter((item) => item.key !== record.key);
    const isSuccess = await DeleteUser(record);
    AlertHandler(isSuccess);
    setUsers(newData);
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
      const newData = [...users];
      const index = newData.findIndex((item) => key === item.key);
      let isSuccess;
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setUsers(newData);
        setEditingKey("");
        isSuccess = await updateUser({ ...item, ...row });
        AlertHandler(isSuccess);
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: MarginSize.xl,
        }}
      >
        <h2>Users</h2>
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
          dataSource={users}
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
          size="large"
        />
      </Form>
    </div>
  );
}

export default UsersList;
