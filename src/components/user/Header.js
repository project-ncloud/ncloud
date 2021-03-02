import React from "react";
import { useDispatch } from "react-redux";
import TopButton from "../sidebar/TopButton";
import UserInfo from "./UserInfo";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <TopButton
        name="N Cloud"
        func={() => dispatch({ type: "TOGGLE_SHOW_ABOUT", data: true })}
      />
      <UserInfo />
    </div>
  );
}

export default Header;
