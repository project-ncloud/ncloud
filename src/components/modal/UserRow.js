import { React } from "react";

function UserRow({ name, username, searchstr = "", checked, func }) {
  if (
    searchstr === "" ||
    name.toUpperCase().indexOf(searchstr.toUpperCase()) > -1
  ) {
    return (
      <div className="row pendingUserRow" onClick={func}>
        <div className="col">
          <i className="ri-user-5-fill"></i>
          {name}
        </div>
        <div className="col">{username}</div>
        <div className="col colAction userRowStyle">
          <div
            className={`customCheckbox ${checked ? "checkBox_checked" : null}`}
          >
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default UserRow;
