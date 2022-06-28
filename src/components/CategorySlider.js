import { Carousel } from "antd";
import React from "react";

function CategorySlider({ data }) {
  return (
    <Carousel
      autoplay
      style={{
        backgroundColor: "black",
        width: "80vw",
        height: "600px",
        margin: "10px 0px 0px 10px ",
      }}
    >
      {data.map((item, index) => (
        <div key={"c" + index} style={{ height: "600px", width: "100%" }}>
          <img src={item.imageUrl} style={{ height: "600px", width: "100%" }} />
        </div>
      ))}
    </Carousel>
  );
}

export default CategorySlider;
