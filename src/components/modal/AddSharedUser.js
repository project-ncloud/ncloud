import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_name } from "../../actions/host";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalEmpty from "./subcomponents/ModalEmpty";
import UserRow from "./UserRow";
import { add_shared_user } from "../../actions/user_admin";
import { syncServerData } from "../../actions/explorer";

const AddSharedUser = ({ searchstr, func }) => {
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const eligibleSharedUsers = useSelector(
    (state) => state.eligibleSharedUserReducer.users
  );
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_ESUSER", data: { key, val } });
  };

  const addSharedUser = async () => {
    setBusy(true);
    const selectedUsers = eligibleSharedUsers.filter((item) => {
      return item.value === true;
    });

    for (let i = 0; i < selectedUsers.length; i++) {
      await add_shared_user({
        server_name: explorerConst.server_name,
        server_address: explorerConst.address,
        host_name: explorerConst.name,
        username: selectedUsers[i].username,
      });
    }
    await syncServerData();
    setBusy(false);
    func();
    dispatch({ type: "TOGGLE_SHOW_SHARED_USERS", data: true });
  };
  return (
    <>
      {eligibleSharedUsers.length > 0 ? (
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
        {eligibleSharedUsers.map((item) => {
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
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            func();
          }}
        />
        <ModalButton
          key="key2"
          name="Add Users"
          onClick={() => addSharedUser()}
        />
      </ModalButtom>
    </>
  );
};

export default AddSharedUser;
