import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove_host, get_name } from "../../actions/host";
import { reFetchServer, getServers } from "../../actions/server";
import "../../styles/container/hostItem.scss";

function HostItem({ data }) {
  const serverData = useSelector((state) => state.serverReducer);
  const dispatch = useDispatch();
  const removeHost = async () => {
    const resObj = await remove_host({
      name: data.name,
      path: data.path,
      server_name: serverData.name,
    });

    if (!resObj.is_error) {
      await getServers();
      await reFetchServer(serverData);
    }
  };

  const fetchValidUsers = async () => {
    const x = data.validUsers.map((item) => {
      return {
        name: get_name(item),
        username: item,
        value: false,
      };
    });
    dispatch({
      type: "STORE_VALID_USER",
      data: {
        hostName: data.name,
        hostPath: data.path,
        validUsers: x,
      },
    });
    dispatch({ type: "STORE_USER_ADMIN", data: data.admin });
    dispatch({ type: "TOGGLE_SHOW_VALID_USERS", data: true });
  };

  return (
    <div className="info hostinfo">
      <div style={{ padding: 0, height: 5 + "px" }}></div>
      <div>
        <i className="ri-hard-drive-fill"></i>
        {data.name}
      </div>
      <div>
        <i className="ri-folder-info-line"></i>
        {data.path}
      </div>
      <div>
        <i className="ri-user-2-fill"></i>
        {data.admin.name === undefined ? "None" : data.admin.name}
      </div>
      <div className="hostOptions">
        <div className="autoHideBtn">
          <i className="ri-settings-3-fill"></i>
          <div>Settings</div>
        </div>

        <div className="autoHideBtn" onClick={() => fetchValidUsers()}>
          <i className="ri-user-settings-fill"></i>
          <div>Manage</div>
        </div>

        <div className="autoHideBtn" onDoubleClick={() => removeHost()}>
          <i className="ri-delete-bin-2-line red"></i>
          <div>Remove</div>
        </div>

        <div className="autoHideBtn">
          <i className="ri-folder-4-line cyan"></i>
          <div>Open</div>
        </div>
      </div>
      <div style={{ padding: 0, height: 5 + "px" }}></div>
    </div>
  );
}

export default HostItem;
