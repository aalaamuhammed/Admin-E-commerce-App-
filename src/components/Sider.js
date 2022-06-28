import React from "react";
import SiderItem from "./SiderItem";
import { HomeOutlined, WalletOutlined, UserOutlined } from "@ant-design/icons";
import { IconSize } from "../assets/Sizes";
function Sider() {
  const siderItemData = [
    {
      path: "/",
      name: "Home",
      Icon: <HomeOutlined style={{ fontSize: IconSize.lg, color: "white" }} />,
    },
    {
      path: "/User",
      name: "User",
      Icon: <UserOutlined style={{ fontSize: IconSize.lg, color: "white" }} />,
    },
    {
      path: "/CheckOut",
      name: "CheckOut",
      Icon: (
        <WalletOutlined style={{ fontSize: IconSize.lg, color: "white" }} />
      ),
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
        />
        <></>
      </div>

      {siderItemData.map((item, index) => (
        <SiderItem
          key={"s" + index}
          path={item.path}
          name={item.name}
          Icon={item.Icon}
        />
      ))}
    </div>
  );
}

export default Sider;
