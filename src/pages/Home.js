import React, { useState, useEffect } from "react";
import { getCategories } from "../services/CategoryService";
import { MarginSize } from "../assets/Sizes";
import CategoryList from "../components/CategoryList";
import CategorySlider from "../components/CategorySlider";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "scroll",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <CategorySlider data={categories} />
      </div>

      {/* Header */}
      <div
        style={{
          flex: 1,
          width: "98%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: MarginSize.xl,
        }}
      >
        <h2>Categories</h2>
      </div>
      <CategoryList data={categories} />
    </div>
  );
};

export default Home;
