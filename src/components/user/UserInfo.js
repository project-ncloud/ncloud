import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../actions/auth";

function UserInfo() {
  const loginInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    dispatch(await LOGOUT());
    history.push("/");
  };
  return (
    <div className="userInfo">
      <i className="ri-user-smile-line"></i>
      <p>{loginInfo.name}</p>
      <div className="signout" onClick={() => logout()}>
        <i
          style={{ fontSize: "20px" }}
          className="ri-logout-circle-line settings icon "
        ></i>
        Sign out
      </div>
    </div>
  );
}

export default UserInfo;
