import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRow from "./UserRow";
import "../../styles/modal/userList.scss";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalError from "./subcomponents/ModalError";

import { setUserAdmin } from "../../actions/user_admin";
import { getServers, reFetchServer } from "../../actions/server";

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function UserAdmin({ searchstr, func }) {
  const validUsers = useSelector((state) => state.validUserReducer.validUsers);
  const serverObj = useSelector((state) => state.serverReducer);
  const [error, setErr] = useState(ERR_OBJ);
  //const userAdminObj = useSelector((state) => state.userAdminReducer);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const selectUser = (key, val) => {
    dispatch({ type: "SELECT_VALID_USER", data: { key, val } });
  };

  const setuserAdmin = async () => {
    setBusy(true);
    const resObj = await setUserAdmin();
    setErr(resObj);

    if (!resObj.is_error) {
      await getServers();
      await reFetchServer(serverObj);
      func();
    }

    setBusy(false);
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
              func={() => selectUser(item.username, !item.value)}
              checked={item.value}
              searchstr={searchstr}
            />
          );
        })}
      </div>

      <ModalError error={error.is_error} msg={error.msg} />

      <ModalButtom busy={busy}>
        <ModalButton
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            dispatch({ type: "RESET_VALID_USER_SELECTION" });
            func();
          }}
        />
        <ModalButton
          key="key2"
          name="Apply"
          onClick={() => {
            setuserAdmin();
          }}
        />
      </ModalButtom>
    </>
  );
}

export default UserAdmin;
