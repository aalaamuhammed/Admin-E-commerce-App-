import React from "react";
import { Link } from "react-router-dom";
import { FontSize, MarginSize } from "../assets/Sizes";

function SiderItem({ path, Icon, name }) {
  return (
    <button
      style={{
        display: "flex",
        // justifyContent: "center",
        backgroundColor: "blue",
        border: 0,
        alignItems: "center",
        margin: MarginSize.xl,
      }}
    >
      {Icon}
      <Link
        style={{
          fontSize: FontSize.lg,
          color: "white",
          fontWeight: "bold",
          marginLeft: MarginSize.md,
        }}
        to={`${path}`}
      >
        {name}
      </Link>
    </button>
  );
}

export default SiderItem;
