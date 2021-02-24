import axios from "axios";
import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useClipboard from "react-use-clipboard";
function DriveCard({ free, driveInfo, onClick, data }) {
  const history = useHistory();
  const dispatch = useDispatch();
  function handleClick(e, data) {
    console.log();
  }

  const openDrive = async () => {
    try {
      const res = await axios.get(`http://${data.address}/dir/`, {
        params: { path: data.path },
      });
      if (res.status === 200) {
        dispatch({ type: "STORE_EXPLORER_DATA", data: res.data });
        dispatch({
          type: "STORE_EXPLORER_CONSTANT",
          data: {
            path: data.path,
            address: data.address,
            name: data.host_name,
            server_name: data.server_name,
            admin: data.is_you_user_admin,
            writable: data.writable,
            validUsers: data.validUsers,
            shared: data.shared,
          },
        });
        history.push("/explorer");
      }
    } catch (Error) {}
  };

  // eslint-disable-next-line no-unused-vars
  const [isCopied, setCopied] = useClipboard(
    `\\\\${data.address.split(":")[0]}\\${data.host_name}`,
    {
      successDuration: 1000,
    }
  );

  const icoStyle = { marginRight: "15px", fontSize: "20px" };
  return (
    <>
      <ContextMenuTrigger id={data.host_name + "contextMenu"}>
        <div
          className={`driveCard ${
            !data.is_running ? "driveCard-offline" : null
          }`}
          onContextMenu={onClick}
          onDoubleClick={() => openDrive()}
        >
          {data.is_you_user_admin ? (
            <div className="useradminBadge">ADMIN</div>
          ) : null}
          <div className="top-card">
            {data.is_running ? (
              <i className="ri-hard-drive-2-line"></i>
            ) : (
              <i className="ri-error-warning-line"></i>
            )}

            <div className="top-card-drive-info">
              <div>{data.host_name}</div>
              <div>{data.is_running ? driveInfo.str : "Currently offline"}</div>
            </div>
          </div>
          <div className="down-card">
            <div className="progressBar">
              {data.is_running ? (
                <div
                  className={`bar ${
                    free > 90 ? "red" : free > 60 ? "yellow" : null
                  }`}
                  style={{ width: `${free}%` }}
                ></div>
              ) : null}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={data.host_name + "contextMenu"}>
        {data.is_running ? (
          <>
            <MenuItem onClick={openDrive}>
              <i className="ri-folder-line purple" style={icoStyle}></i>
              Open
            </MenuItem>
            <MenuItem onClick={setCopied}>
              <i className="ri-clipboard-line yellow" style={icoStyle}></i>
              Copy SMB URL
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleClick}>
            <i style={icoStyle} className="ri-error-warning-line red"></i>Drive
            is currently offline
          </MenuItem>
        )}
      </ContextMenu>
    </>
  );
}

export default DriveCard;
