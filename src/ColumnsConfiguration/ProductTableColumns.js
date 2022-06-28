import { Button, Popconfirm, Typography } from "antd";

export const GetColumns = ({
  save,
  isEditing,
  handleDelete,
  edit,
  cancel,
  editingKey,
  AddToCart,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },

    {
      title: "Description",
      dataIndex: "description",
      width: "20%",
      editable: true,
    },

    {
      title: "Image",
      dataIndex: "image",
      width: "15%",
      render: (_, record) => {
        return <img src={record.imageUrl} style={{ width: "100%" }} />;
      },
    },
    {
      title: "Image Url",
      dataIndex: "imageUrl",
      width: "15%",
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {text}
        </div>
      ),
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {editable ? (
              <>
                <Button
                  type="primary"
                  ghost
                  onClick={() => save(record.key)}
                  style={{
                    borderRadius: 5,
                    margin: "0px 10px",
                  }}
                >
                  Save
                </Button>
                <Button
                  type="ghost"
                  danger
                  style={{
                    borderRadius: 5,
                    margin: "0px 10px",
                  }}
                  //onClick={() => save(record.key)}
                >
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    Cancel
                  </Popconfirm>
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{
                    borderRadius: 5,
                  }}
                  ghost
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                >
                  Edit
                </Button>

                <Button
                  style={{
                    borderRadius: 5,
                    margin: "0px 10px",
                  }}
                  type="primary"
                  onClick={() => AddToCart(record)}
                  disabled={editingKey !== ""}
                >
                  {/* TODO : ADD TO CART */}
                  Add To Cart
                </Button>

                <Button
                  style={{
                    borderRadius: 5,
                  }}
                  type="ghost"
                  danger
                  disabled={editingKey !== ""}
                >
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => handleDelete(record)}
                  >
                    Delete
                  </Popconfirm>
                </Button>
              </>
            )}
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
        inputType:
          col.dataIndex === "quantity" || col.dataIndex === "price"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return mergedColumns;
};
