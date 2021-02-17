import React from "react";
import TopButton from "../sidebar/TopButton";
import UserInfo from "./UserInfo";

function Header() {
  return (
    <div className="header">
      <TopButton name="N Cloud" />
      <UserInfo />
    </div>
  );
}

export default Header;
