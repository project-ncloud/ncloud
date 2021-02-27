import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_name } from "../../actions/host";

function SideBar({ func, func2 }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const explorerConstants = useSelector(
    (state) => state.explorerControlReducer
  );

  const openSharedUserPanel = () => {
    const users = explorerConstants.shared.shared.map((item) => {
      return {
        username: item,
        name: get_name(item),
      };
    });
    dispatch({
      type: "STORE_SUSER",
      data: users,
    });
    dispatch({ type: "TOGGLE_SHOW_SHARED_USERS", data: true });
  };

  const goBackHome = () => {
    history.goBack();
  };
  return (
    <div className="fSideBar">
      <i className="ri-hard-drive-fill" onClick={() => goBackHome()}></i>

      {explorerConstants.writable ? (
        <>
          <i className="ri-add-line" onClick={() => func()}></i>
          <i className="ri-folder-add-line" onClick={() => func2()}></i>
        </>
      ) : (
        <>
          <i className="ri-add-line disabled"></i>
          <i className="ri-folder-add-line disabled"></i>
        </>
      )}

      {explorerConstants.admin ? (
        <i
          className="ri-share-forward-line"
          onClick={() => openSharedUserPanel()}
        ></i>
      ) : (
        <i className="ri-share-forward-line disabled"></i>
      )}
    </div>
  );
}

export default SideBar;
