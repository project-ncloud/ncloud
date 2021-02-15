import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IS_TOKEN_VALID } from "../actions/auth";
import { GET_TOKEN } from "../actions/helper";
import Sidebar from "./sidebar/Sidebar";
import Container from "./Container";
import Console from "./Console";
import Modals from "./Modals";

function Admin() {
  const loginInfo = useSelector((state) => state.authReducer);
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
            history.push("/user");
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
      <Sidebar />
      <Container />
      <Console />
      <Modals />
    </>
  );
}

export default Admin;
