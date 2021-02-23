import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddPendingUser from "./modal/AddPendingUser";
import AddServer from "./modal/AddServer";
import AddValidUsers from "./modal/AddValidUsers";
import CreateHost from "./modal/CreateHost";
import CreateManager from "./modal/CreateManager";
import HostPreferences from "./modal/HostPreferences";
import InfoModal from "./modal/InfoModal";
import Manager from "./modal/Manager";
import Modal from "./modal/Modal";
import NcloudSettings from "./modal/NcloudSettings";
import ServerPreferences from "./modal/ServerPreferences";
import User from "./modal/User";
import UserAdmin from "./modal/UserAdmin";
import ValidUsers from "./modal/ValidUsers";
import SharedUser from "./modal/SharedUser";

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

      <Modal
        name="Shared Users"
        specClass="modalList addServer"
        width="800px"
        has_list={true}
        showMe={toggleModal.show_sharedUsersList}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_SHARED_USERS", data: false });
        }}
      >
        <SharedUser />
      </Modal>

      <Modal
        name="NCloud Preferences"
        specClass="modalList addServer"
        showMe={toggleModal.show_ncloud_preferences}
        func={() => {
          dispatch({ type: "TOGGLE_NCLOUD_PREFERENCES", data: false });
        }}
      >
        <NcloudSettings />
      </Modal>

      <Modal
        name="Server Preferences"
        specClass="modalList addServer"
        showMe={toggleModal.show_server_preferences}
        func={() => {
          dispatch({ type: "TOGGLE_SERVER_PREFERENCES", data: false });
        }}
      >
        <ServerPreferences />
      </Modal>

      <Modal
        name="Host Preferences"
        specClass="modalList addServer"
        showMe={toggleModal.show_host_preferences}
        func={() => {
          dispatch({ type: "TOGGLE_HOST_PREFERENCES", data: false });
        }}
      >
        <HostPreferences />
      </Modal>

      <InfoModal
        name="Host Preferences"
        specClass="modalList addServer"
        showMe={toggleModal.show_about}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_ABOUT", data: false });
        }}
      />
    </>
  );
}

export default Modals;
