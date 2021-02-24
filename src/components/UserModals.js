import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./modal/Modal";
import SharedUser from "./modal/SharedUser";
import AddSharedUser from "./modal/AddSharedUser";
import SharedPreferences from "./modal/SharedPreferences";

const UserModals = () => {
  const toggleModal = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  return (
    <>
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
        name="Add Shared User"
        specClass="modalList addServer"
        width="800px"
        has_list={true}
        showMe={toggleModal.show_addSharedUser}
        func={() => {
          dispatch({ type: "TOGGLE_ADD_SHARED_USERS", data: false });
        }}
      >
        <AddSharedUser />
      </Modal>
      <Modal
        name="Shared User Preferences"
        specClass="modalList addServer"
        showMe={toggleModal.show_shared_preferences}
        func={() => {
          dispatch({ type: "TOGGLE_SHOW_SHARED_PREFERENCES", data: false });
        }}
      >
        <SharedPreferences />
      </Modal>
    </>
  );
};

export default UserModals;
