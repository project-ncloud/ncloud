import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SideBar({ func }) {
  const history = useHistory();
  const explorerConstants = useSelector(
    (state) => state.explorerControlReducer
  );

  const goBackHome = () => {
    history.goBack();
  };
  return (
    <div className="fSideBar">
      <i className="ri-hard-drive-fill" onClick={() => goBackHome()}></i>
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
        onClick={() => {}}
      ></i>
    </div>
  );
}

export default SideBar;
