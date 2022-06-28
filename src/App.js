import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import CategoryList from "./pages/UsersList";
import Sider from "./components/Sider";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import CheckOut from "./pages/CheckOut";
import UsersList from "./pages/UsersList";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}
    >
      <Sider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CategoryList" element={<CategoryList />} />
        <Route
          path="/ProductList/:categoryId/:categoryName"
          element={<ProductList />}
        />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/User" element={<UsersList />} />
        {/* <Route path="ProductForm" element={<ProductForm />} /> */}
      </Routes>
    </div>
  );
};

export default App;
