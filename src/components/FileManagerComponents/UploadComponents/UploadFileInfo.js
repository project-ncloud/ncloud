import React from "react";
import { getIco, is_replace } from "../../../actions/explorer";

function UploadFileInfo({ fileInfo, func }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="dropZone">
        {getIco(fileInfo.extension, false, false)}
        <div className="fileInfo">
          <p className="fileName">{fileInfo.name}</p>
          <p className="fileSize">{fileInfo.sizeStr}</p>
          <button className="purple listBg" onClick={() => func()}>
            {is_replace(fileInfo.name) ? "Replace" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFileInfo;
