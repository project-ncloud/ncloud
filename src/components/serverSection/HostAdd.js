import React from "react";
import { useDispatch } from "react-redux";
import "../../styles/container/hostItem.scss";
function HostAdd() {
  const dispatch = useDispatch();
  return (
    <div
      className="info hostinfo hostAdd"
      onClick={() => {
        dispatch({ type: "TOGGLE_CREATE_HOST", data: true });
      }}
    >
      <i className="ri-add-fill purple"></i>
    </div>
  );
}

export default HostAdd;
