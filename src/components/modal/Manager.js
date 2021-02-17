import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRow from "./UserRow";
import { remove_managers } from "../../actions/manager";
import "../../styles/modal/userList.scss";
import ModalEmpty from "./subcomponents/ModalEmpty";

function Manager({ searchstr }) {
  const users = useSelector((state) => state.managerReducer.managers);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_MANAGER", data: { key, val } });
  };

  const removeManager = async () => {
    setBusy(true);
    //Pending
    await remove_managers();
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
            <button className="subBg purple" onClick={() => removeManager()}>
              Remove Managers
            </button>
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_CREATE_MANAGER", data: true })
              }
            >
              Create Manager
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

export default Manager;
