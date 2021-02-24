import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_name } from "../../actions/host";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalEmpty from "./subcomponents/ModalEmpty";
import UserRow from "./UserRow";
import {
  get_AddSharedUsers,
  remove_shared_user,
} from "../../actions/user_admin";
import { syncServerData } from "../../actions/explorer";

function SharedUser({ searchstr, func }) {
  const sharedUsers = useSelector((state) => state.sharedUserReducer.users);
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_SUSER", data: { key, val } });
  };

  const removeSharedUser = async () => {
    setBusy(true);
    const selectedUsers = sharedUsers.filter((item) => {
      return item.value === true;
    });

    for (let i = 0; i < selectedUsers.length; i++) {
      await remove_shared_user({
        server_name: explorerConst.server_name,
        server_address: explorerConst.address,
        host_name: explorerConst.name,
        username: selectedUsers[i].username,
      });
    }
    await syncServerData();
    await setBusy(false);
  };

  return (
    <>
      {sharedUsers.length > 0 ? (
        <div className="list listHead" style={{ height: "max-content" }}>
          <div className="row pendingUserRow">
            <div className="col">Name</div>
            <div className="col">Username</div>
            <div className="col colAction">Action</div>
          </div>
        </div>
      ) : (
        <ModalEmpty />
      )}
      <div className="list userListM" style={{ height: "350px" }}>
        {sharedUsers.map((item) => {
          return (
            <UserRow
              key={item.username}
              name={get_name(item.username)}
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
          key="key11"
          name="Preferences"
          type2={true}
          onClick={() => {
            func();
            dispatch({ type: "TOGGLE_SHOW_SHARED_PREFERENCES", data: true });
          }}
        />
        <ModalButton
          key="key0"
          name="Add Shared User"
          type2={true}
          onClick={() => {
            func();
            let users = get_AddSharedUsers().map((item) => {
              return { ...item, value: false };
            });
            dispatch({ type: "STORE_ESUSER", data: users });
            dispatch({ type: "TOGGLE_ADD_SHARED_USERS", data: true });
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
          name="Remove"
          onClick={() => removeSharedUser()}
        />
      </ModalButtom>
    </>
  );
}

export default SharedUser;
