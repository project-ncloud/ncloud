import React from "react";
import { useSelector } from "react-redux";
import { remove_host } from "../../actions/host";
import { reFetchServer, getServers } from "../../actions/server";
import "../../styles/container/hostItem.scss";

function HostItem({ data }) {
  const serverData = useSelector((state) => state.serverReducer);

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
        <i class="ri-user-2-fill"></i>
        User admin
      </div>
      <div className="hostOptions">
        <div className="autoHideBtn">
          <i class="ri-settings-3-fill"></i>
          <div>Settings</div>
        </div>

        <div className="autoHideBtn">
          <i class="ri-user-settings-fill"></i>
          <div>Manage</div>
        </div>

        <div className="autoHideBtn" onDoubleClick={() => removeHost()}>
          <i class="ri-delete-bin-2-line red"></i>
          <div>Remove</div>
        </div>

        <div className="autoHideBtn">
          <i class="ri-folder-4-line cyan"></i>
          <div>Open</div>
        </div>
      </div>
      <div style={{ padding: 0, height: 5 + "px" }}></div>
    </div>
  );
}

export default HostItem;
