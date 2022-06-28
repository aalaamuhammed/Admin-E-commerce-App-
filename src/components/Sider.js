import React from "react";
import SiderItem from "./SiderItem";
import { HomeOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { IconSize } from "../assets/Sizes";
function Sider() {
  const siderItemData = [
    {
      path: "/",
      name: "Home",
      Icon: <HomeOutlined style={{ fontSize: IconSize.lg, color: "white" }} />,
    },
    {
      path: "/ProductForm",
      name: "Products",
      Icon: (
        <FormOutlined style={{ fontSize: IconSize.lg, color: "#ffffff" }} />
      ),
    },
    {
      path: "/User",
      name: "User",
      Icon: <UserOutlined style={{ fontSize: IconSize.lg, color: "green" }} />,
    },
    {
      path: "/CheckOut",
      name: "CheckOut",
      Icon: <UserOutlined style={{ fontSize: IconSize.lg, color: "green" }} />,
    },
  ];
  return (
    <div
      style={{
        // flex: 1,
        backgroundColor: "blue",
        maxWidth: 250,
        minWidth: 150,
      }}
    >
      <div
        style={{
          width: "100%",
          //    display: "flex",
          height: "700",
        }}
      >
        <img
          src="https://us.123rf.com/450wm/maudis60/maudis601602/maudis60160200082/51858565-vector-sign-up-arrow-letter-a.jpg?ver=6"
          style={{ width: "100%" }}
          alt="hahah"
        />
        <></>
      </div>

      {siderItemData.map((item, index) => (
        <SiderItem
          key={"s" + index}
          path={item.path}
          name={item.name}
          Icon={<HomeOutlined style={{ fontSize: IconSize.lg }} />}
        />
      ))}
    </div>
  );
}

export default Sider;
