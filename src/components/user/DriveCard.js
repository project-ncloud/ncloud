import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import useClipboard from "react-use-clipboard";
function DriveCard({
  name,
  free,
  driveInfo,
  admin,
  running,
  onClick,
  address,
  path,
}) {
  function handleClick(e, data) {
    console.log();
  }

  // eslint-disable-next-line no-unused-vars
  const [isCopied, setCopied] = useClipboard(
    `\\\\${address.split(":")[0]}\\${name}`,
    {
      successDuration: 1000,
    }
  );

  const icoStyle = { marginRight: "15px", fontSize: "20px" };
  return (
    <>
      <ContextMenuTrigger id={name + "contextMenu"}>
        <div
          className={`driveCard ${!running ? "driveCard-offline" : null}`}
          onContextMenu={onClick}
        >
          {admin ? <div className="useradminBadge">ADMIN</div> : null}
          <div className="top-card">
            {running ? (
              <i className="ri-hard-drive-2-line"></i>
            ) : (
              <i className="ri-error-warning-line"></i>
            )}

            <div className="top-card-drive-info">
              <div>{name}</div>
              <div>{running ? driveInfo : "Currently offline"}</div>
            </div>
          </div>
          <div className="down-card">
            <div className="progressBar">
              {running ? (
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
      <ContextMenu id={name + "contextMenu"}>
        {running ? (
          <>
            <MenuItem onClick={handleClick}>
              <i className="ri-folder-line purple" style={icoStyle}></i>
              Open
            </MenuItem>
            <MenuItem onClick={setCopied}>
              <i className="ri-clipboard-line yellow" style={icoStyle}></i>
              Copy SMB URL
            </MenuItem>
            {admin ? (
              <MenuItem onClick={handleClick}>
                <i style={icoStyle} className="ri-settings-3-line"></i>Settings
              </MenuItem>
            ) : null}
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
