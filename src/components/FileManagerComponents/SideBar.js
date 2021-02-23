import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_name } from "../../actions/host";

function SideBar({ func }) {
  const history = useHistory();
  const dispatch = useDispatch();
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
        onClick={() => {
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
        }}
      ></i>
    </div>
  );
}

export default SideBar;
