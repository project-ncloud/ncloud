import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove_users } from "../../actions/user";
import UserRow from "./UserRow";
import "../../styles/modal/userList.scss";
import ModalEmpty from "./subcomponents/ModalEmpty";

function User({ searchstr }) {
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_USER", data: { key, val } });
  };

  const removeUsers = async () => {
    setBusy(true);
    //Pending
    await remove_users();
    setBusy(false);
  };

  return (
    <>
      {users.length > 0 ? (
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
            <button className="subBg purple" onClick={() => removeUsers()}>
              Remove Users
            </button>
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

export default User;
