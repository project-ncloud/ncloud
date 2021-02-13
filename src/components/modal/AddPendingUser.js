import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  remove_pending_users,
  approve_pending_users,
} from "../../actions/pending_user";
import UserRow from "./UserRow";
import "../../styles/modal/userList.scss";

function AddPendingUser({ searchstr }) {
  const users = useSelector((state) => state.pendingUserReducer.pending_users);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_PENDING_USER", data: { key, val } });
  };

  const removePendingUsers = async () => {
    setBusy(true);
    //Pending
    await remove_pending_users();
    setBusy(false);
  };

  const approvePendingUsers = async () => {
    setBusy(true);
    //Pending
    await approve_pending_users();
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
        {users.map((item) => {
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

      <div className="row addServerRow buttonRow">
        {!busy ? (
          <>
            <button
              className="subBg purple"
              onClick={() => removePendingUsers()}
            >
              Remove Users
            </button>
            <button onClick={() => approvePendingUsers()}>Approve Users</button>
          </>
        ) : (
          <button
            className="subBg purple"
            style={{ color: "var(--sub-text-color)" }}
          >
            Please wait
          </button>
        )}
      </div>
    </>
  );
}

export default AddPendingUser;
