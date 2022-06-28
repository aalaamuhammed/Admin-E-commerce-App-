import { Divider, Row, Col, Button } from "antd";
import React, { useState, useEffect } from "react";
import { FontSize } from "../assets/Sizes";
import { CalculateCartTotalPrice } from "../services/CartService";

function CheckoutDetails({ load }) {
  const [data, setData] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [actualPrice, setActualPrice] = useState();
  // const data = [
  //   { name: "Product Name", price: "10", quantity: "20" },
  //   { name: "Product Name", price: "10", quantity: "20" },
  //   { name: "Product Name", price: "10", quantity: "20" },
  // ];
  // const taxes = [
  //   { name: "Value Added Tax", value: "14", totalAmount: "250" },
  //   { name: "Delivery", value: "", totalAmount: "20" },
  // ];
  const fetchData = async () => {
    const result = await CalculateCartTotalPrice();
    setData(result.totalPrice);
    setTaxes(result.taxesDetails);
    setActualPrice(result.actualPrice);
  };
  useEffect(() => {
    fetchData();
  }, [load]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "lightgray",
        borderRadius: "5px",
        display: "flex",
        padding: "20px 10px 10px 10px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Checkout Details</h2>
        <Divider type="horizontal" orientation="center" />
        <h4>Order Summary</h4>
        {data.map((item) => (
          <Row style={{ margin: "10px 0px ", fontSize: FontSize.md }}>
            <Col offset={1} span={8}>
              {item.name}
            </Col>
            <Col offset={9}>{item.itemTotal} L.E</Col>
          </Row>
        ))}
        <Divider type="horizontal" orientation="center" />
        <h4>Extra Fees</h4>
        {taxes.map((item) => (
          <Row style={{ margin: "10px 0px ", fontSize: FontSize.md }}>
            <Col offset={1} span={8}>
              {item.name}
            </Col>
            <Col offset={9}>{item.totalAmount} L.E</Col>
          </Row>
        ))}
        <Divider type="horizontal" orientation="center" />
        <Row style={{ margin: "10px 0px ", fontSize: FontSize.md }}>
          <Col offset={1} span={8}>
            Total Price
          </Col>
          <Col offset={9}>{actualPrice} L.E</Col>
        </Row>
      </div>
      <div
        style={{
          margin: "0px 0px 20px 0px",
          textAlign: "center",
        }}
      >
        <Button style={{ fontWeight: "bold" }} type="primary">
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default CheckoutDetails;
