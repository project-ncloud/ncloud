import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRow from "./UserRow";
import "../../styles/modal/userList.scss";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import { add_validUsers } from "../../actions/valid_user";

function AddValidUsers({ searchstr, func }) {
  const fUsers = useSelector((state) => state.filteredoutUserReducer.users);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const switchUser = (key, val) => {
    dispatch({ type: "TOGGLE_FUSER", data: { key, val } });
  };

  const add_into_valid_user = async () => {
    setBusy(true);
    await add_validUsers();
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
        {fUsers.map((item) => {
          return (
            <UserRow
              key={item.username + "fuser"}
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
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            func();
          }}
        />
        <ModalButton
          key="key0"
          name="Add Selected users"
          type2={true}
          onClick={() => {
            add_into_valid_user();
          }}
        />
      </ModalButtom>
    </>
  );
}

export default AddValidUsers;
