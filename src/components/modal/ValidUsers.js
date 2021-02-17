import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRow from "./UserRow";
import "../../styles/modal/userList.scss";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import { filterOutUsers, remove_validUsers } from "../../actions/valid_user";

function ValidUsers({ searchstr, func }) {
  const validUsers = useSelector((state) => state.validUserReducer.validUsers);
  const userAdminObj = useSelector((state) => state.userAdminReducer);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_VALID_USER", data: { key, val } });
  };

  const openUserAdminModal = () => {
    dispatch({
      type: "TOGGLE_SELECTION_MODE_VALID_USER",
      data: userAdminObj.name,
    });
    dispatch({ type: "TOGGLE_ADD_USER_ADMIN", data: true });
  };

  const removeValidUsers = async () => {
    setBusy(true);
    //Pending
    await remove_validUsers();
    setBusy(false);
    func();
  };

  return (
    <>
      <div className="list listHead" style={{ height: "max-content" }}>
        <div className="row pendingUserRow">
          <div className="col">Name</div>
          <div className="col">Username</div>
          <div className="col colAction">Action</div>
        </div>
      </div>

      <div className="list userListM" style={{ height: "350px" }}>
        {validUsers.map((item) => {
          return (
            <UserRow
              key={item.username}
              name={item.name}
              username={item.username}
              func={() => switchUser(item.username, !item.value)}
              checked={item.value}
              searchstr={searchstr}
            />
          );
        })}
      </div>

      <ModalButtom busy={busy}>
        <ModalButton
          key="key-1"
          name="Change User Admin"
          type2={true}
          onClick={() => {
            openUserAdminModal();
            func();
          }}
        />
        <ModalButton
          key="key0"
          name="Add Valid user"
          type2={true}
          onClick={() => {
            filterOutUsers();
            dispatch({ type: "TOGGLE_ADD_VALID_USERS", data: true });
            func();
          }}
        />
        <ModalButton
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            func();
          }}
        />
        <ModalButton
          key="key2"
          name="Remove selected users"
          onClick={() => removeValidUsers()}
        />
      </ModalButtom>
    </>
  );
}

export default ValidUsers;
