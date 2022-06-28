import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AddProduct } from "../services/ProductService";
import { getCategories } from "../services/CategoryService";

function ProductForm() {
  const [categories, setCategories] = useState([]);
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

  const onFinish = async (values) => {
    console.log("Success:", values);
    let isSuccess = await AddProduct({ ...values });
    AlertHandler(isSuccess);
  };
  const fetchData = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onCategoryChange = (value, m) => {
    console.log({ value, m });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",

        // backgroundColor: "lightgrey",
      }}
    >
      <div
        style={{
          margin: "30px 10px 10px 30px ",
        }}
      >
        <h1 style={{}}>Add New Product</h1>
        <h3>Fill Product Information</h3>
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

      <Form
        style={{
          margin: "25px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: "60px",
          //   alignItems: "baseline",
        }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
            >
              <Input
                style={{ borderRadius: "5px" }}
                placeholder="Product Name"
              />
            </Form.Item>
          </Col>
          {/* TODO: Handle Selector */}
          <Col span={8}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Please choose category",
                },
              ]}
            >
              <Select
                onChange={onCategoryChange}
                placeholder="Select Category"
                style={{ width: 120, borderRadius: 5 }}
              >
                {categories.map((item, index) => (
                  <Option key={item.id + "select"} value={item.id}>
                    {item.category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="Image Url"
              name="imageUrl"
              rules={[
                {
                  required: true,
                  message: "Please input your image url!",
                },
              ]}
            >
              <Input style={{ borderRadius: "5px" }} placeholder="Image URL" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input your quantity!",
                },
                {
                  type: "number",
                  min: 1,
                  message: "Minimum value is 1",
                },
              ]}
            >
              <InputNumber style={{ borderRadius: "5px" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <TextArea
                style={{ borderRadius: "5px" }}
                rows={4}
                placeholder="Description"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
                {
                  type: "number",
                  min: 1,
                  message: "Minimum value is 1",
                },
              ]}
            >
              <InputNumber style={{ borderRadius: "5px" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductForm;
