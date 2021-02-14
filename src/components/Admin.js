import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IS_TOKEN_VALID } from "../actions/auth";
import { GET_TOKEN } from "../actions/helper";
import Sidebar from "./sidebar/Sidebar";
import Container from "./Container";
import Console from "./Console";
import Modal from "./modal/Modal";
import AddServer from "./modal/AddServer";
import CreateHost from "./modal/CreateHost";
import AddPendingUser from "./modal/AddPendingUser";
import User from "./modal/User";
import Manager from "./modal/Manager";
import CreateManager from "./modal/CreateManager";

function Admin() {
  const loginInfo = useSelector((state) => state.authReducer);
  const history = useHistory();

  const toggleModal = useSelector((state) => state.modalReducer);
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
  }, [history, loginInfo.username]);

  return (
    <>
      <Sidebar />
      <Container />
      <Console />

      <Modal
        name="Add Server"
        specClass="modalList addServer"
        showMe={toggleModal.show_addServer}
        func={() => {
          dispatch({ type: "TOGGLE_ADD_SERVER", data: false });
        }}
      >
        <AddServer />
      </Modal>

      <Modal
        name="Create Host"
        specClass="modalList addServer"
        showMe={toggleModal.show_createHost}
        func={() => {
          dispatch({ type: "TOGGLE_CREATE_HOST", data: false });
        }}
      >
        <CreateHost />
      </Modal>

      <Modal
        name="Pending Users"
        specClass="modalList addServer"
        width="800px"
        has_list={true}
        showMe={toggleModal.show_pendingUsersList}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_PENDING_USERS", data: false });
        }}
      >
        <AddPendingUser />
      </Modal>

      <Modal
        name="Users"
        specClass="modalList addServer"
        width="800px"
        has_list={true}
        showMe={toggleModal.show_usersList}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_USERS", data: false });
        }}
      >
        <User />
      </Modal>

      <Modal
        name="Managers"
        specClass="modalList addServer"
        width="800px"
        has_list={true}
        showMe={toggleModal.show_managersList}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_MANAGERS", data: false });
        }}
      >
        <Manager />
      </Modal>

      <Modal
        name="Create Manager"
        specClass="modalList addServer"
        showMe={toggleModal.show_createManager}
        func={() => {
          dispatch({ type: "TOGGLE_CREATE_MANAGER", data: false });
        }}
      >
        <CreateManager />
      </Modal>
    </>
  );
}

export default Admin;
