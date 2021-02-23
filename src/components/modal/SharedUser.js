import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_name } from "../../actions/host";
import ModalEmpty from "./subcomponents/ModalEmpty";
import UserRow from "./UserRow";

function SharedUser({ searchstr }) {
  const sharedUsers = useSelector((state) => state.sharedUserReducer.users);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_SUSER", data: { key, val } });
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
    </>
  );
}

export default SharedUser;
