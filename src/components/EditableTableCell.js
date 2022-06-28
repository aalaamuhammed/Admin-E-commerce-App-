import React from "react";
import { Form, InputNumber, Input } from "antd";
const EditableTableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
            {
              type: inputType === "number" ? "number" : "string",
              min: inputType === "number" ? 1 : 5,
              message:
                inputType === "number"
                  ? `minimum value is 1`
                  : "length must be more than 5",
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableTableCell;
