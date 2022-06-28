import React, { useState } from "react";
import Cart from "../components/Cart";
import CheckoutDetails from "../components/CheckoutDetails";

const ChoutPage = () => {
  const [load, setLoad] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <div style={{ margin: "30px" }}>
        <h1>Shopping Cart</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3, margin: "30px" }}>
          <Cart setLoad={setLoad} />
        </div>
        <div
          style={{
            flex: 1,
            height: "70vh",
            marginRight: "30px",
            display: "flex",
          }}
        >
          <CheckoutDetails load={load} />
        </div>
      </div>
    </div>
  );
};

export default ChoutPage;
