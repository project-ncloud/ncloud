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
      <div className="hostOptions">
        <i className="ri-settings-3-fill"></i>
        <i className="ri-user-add-fill"></i>
        <i className="ri-user-settings-fill"></i>
        <i
          className="ri-delete-bin-2-line red"
          onDoubleClick={() => removeHost()}
        ></i>
      </div>
      <div style={{ padding: 0, height: 5 + "px" }}></div>
    </div>
  );
}

export default HostItem;
