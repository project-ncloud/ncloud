import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPendingUser from "./modal/AddPendingUser";
import AddServer from "./modal/AddServer";
import AddValidUsers from "./modal/AddValidUsers";
import CreateHost from "./modal/CreateHost";
import CreateManager from "./modal/CreateManager";
import Manager from "./modal/Manager";
import Modal from "./modal/Modal";
import User from "./modal/User";
import UserAdmin from "./modal/UserAdmin";
import ValidUsers from "./modal/ValidUsers";

function Modals() {
  const toggleModal = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  return (
    <>
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

      <Modal
        name="Valid users"
        specClass="modalList addServer"
        showMe={toggleModal.show_validUsersList}
        width="800px"
        has_list={true}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_VALID_USERS", data: false });
        }}
      >
        <ValidUsers />
      </Modal>

      <Modal
        name="Add Valid Users"
        specClass="modalList addServer"
        showMe={toggleModal.show_addValidUser}
        width="800px"
        has_list={true}
        func={() => {
          dispatch({ type: "TOGGLE_ADD_VALID_USERS", data: false });
        }}
      >
        <AddValidUsers />
      </Modal>

      <Modal
        name="Change User Admin"
        specClass="modalList addServer"
        showMe={toggleModal.show_addUserAdmin}
        width="800px"
        has_list={true}
        func={() => {
          dispatch({ type: "TOGGLE_ADD_USER_ADMIN", data: false });
        }}
      >
        <UserAdmin />
      </Modal>
    </>
  );
}

export default Modals;
