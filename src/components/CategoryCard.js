import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MarginSize } from "../assets/Sizes";

function CategoryCard({ item }) {
  const navigate = useNavigate();
  const NavigateTo = () => {
    navigate(`./ProductList/${item.id}/${item.category}`);
  };
  return (
    <Card
      style={{
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
        borderRadius: "24px",
        margin: "20px 5px",
      }}
      title={item.category}
      bordered={false}
    >
      <img style={{ width: "100%", height: "250px" }} src={item.imageUrl} />
      <input
        type="button"
        value="See Products"
        onClick={NavigateTo}
        style={{ marginTop: MarginSize.md, alignSelf: "flex-start" }}
      />
    </Card>
  );
}

export default CategoryCard;
