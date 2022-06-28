import { Button, Popconfirm } from "antd";

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
      width: "20%",
      editable: true,
    },

    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      editable: true,
    },
    {
      title: "Number of Orders",
      dataIndex: "numOfOrders",
      width: "20%",
      editable: true,
    },
    {
      title: "Total of Orders",
      dataIndex: "totalOfOrders",
      width: "15%",
      editable: true,
    },
    {
      title: "Operation",
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
                    margin: "0px 10px",
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
          col.dataIndex === "totalOfOrders" || col.dataIndex === "numOfOrders"
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
