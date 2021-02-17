import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IS_TOKEN_VALID } from "../actions/auth";
import { GET_TOKEN } from "../actions/helper";
import Header from "./user/Header";
import "../styles/userBase.scss";
import DriveContainer from "./user/DriveContainer";
import { getServers } from "../userActions/server";

function User() {
  const loginInfo = useSelector((state) => state.authReducer);
  const servers = useSelector((state) => state.serversReducer);
  const sharedServers = useSelector((state) => state.sharedServersReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkingToken() {
      const token = GET_TOKEN();
      if (token !== null) {
        const obj = await IS_TOKEN_VALID(token);
        dispatch({ type: "REFRESH_AUTH", data: obj.data });
        if (obj.status) {
          const { manager, admin } = obj.data;
          if (admin !== true && manager !== true) {
            await getServers();
          } else {
            history.push("/admin");
          }
        } else {
          history.push("/");
        }
      } else {
        history.push("/");
      }
    }
    checkingToken();
  }, [dispatch, history, loginInfo.username]);

  return (
    <>
      <Header />
      <div className="driveGridHead">Drives</div>
      <DriveContainer key="drives" data={servers} />
      {sharedServers.length < 1 ? null : (
        <>
          <div className="driveGridHead">Shared Drives</div>
          <DriveContainer key="sharedDrives" data={sharedServers} />
        </>
      )}
    </>
  );
}

export default User;
