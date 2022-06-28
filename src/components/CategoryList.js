import { Col, Row } from "antd";
import React from "react";
import CategoryCard from "./CategoryCard";

function CategoryList({ data }) {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {data.map((item, index) => (
          <Col key={"categoryList" + index} span={8}>
            <CategoryCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryList;
