import axios from "axios";
import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useSelector } from "react-redux";
import { getIco } from "../../actions/explorer";

const icoStyle = { marginRight: "15px", fontSize: "20px" };

const ItemCard = ({
  name,
  path,
  isDir,
  extension,
  date,
  size,
  up = false,
  upFunc,
  downFunc,
  back,
}) => {
  const writable = useSelector(
    (state) => state.explorerControlReducer.writable
  );
  const dummyFunc = () => {
    return;
  };

  //
  const longPath = name.split("/");
  const file_name = longPath[longPath.length - 1];
  longPath.pop();

  const download = () => {
    const link = document.createElement("a");
    link.href = `http://127.0.0.1:6900/testRoute/?path=${path}&file_name=${file_name}`;
    link.target = "blank";
    link.click();
  };

  return (
    <>
      <ContextMenuTrigger id={name + extension + size + "contextMenu"}>
        <div
          className="card"
          onClick={() => {
            up ? upFunc() : dummyFunc();
          }}
          onDoubleClick={() => {
            isDir ? downFunc(name) : up ? back() : dummyFunc();
          }}
        >
          {getIco(extension, isDir, up)}
          <p className="fName">{name}</p>
          {!up && !isDir ? <p className="fSize">{size}</p> : false}
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={name + extension + size + "contextMenu"}>
        <>
          {isDir ? (
            <MenuItem
              onClick={() => {
                downFunc(name);
              }}
            >
              <i className="ri-folder-line purple" style={icoStyle}></i>
              Open
            </MenuItem>
          ) : up ? (
            <MenuItem onClick={upFunc}>
              <i className="ri-arrow-go-back-line" style={icoStyle}></i>
              Go back
            </MenuItem>
          ) : (
            <MenuItem onClick={download}>
              <i className="ri-download-cloud-2-line cyan" style={icoStyle}></i>
              Download
            </MenuItem>
          )}

          {up || !writable ? null : (
            <MenuItem>
              <i className="ri-delete-bin-line red" style={icoStyle}></i>
              {isDir ? "Remove Folder" : "Remove File"}
            </MenuItem>
          )}
        </>
      </ContextMenu>
    </>
  );
};

export default ItemCard;
