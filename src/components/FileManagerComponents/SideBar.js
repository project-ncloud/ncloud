import React from "react";
import { useSelector } from "react-redux";

function SideBar({ func }) {
  const explorerConstants = useSelector(
    (state) => state.explorerControlReducer
  );
  return (
    <div className="fSideBar">
      <i className="ri-hard-drive-fill"></i>
      <i
        className={`ri-add-line ${
          !explorerConstants.writable ? "disabled" : null
        }`}
        onClick={() => func()}
      ></i>
      <i
        className={`ri-folder-add-line ${
          !explorerConstants.writable ? "disabled" : null
        }`}
      ></i>
      <i
        className={`ri-share-forward-line ${
          !explorerConstants.admin ? "disabled" : null
        }`}
      ></i>
    </div>
  );
}

export default SideBar;
