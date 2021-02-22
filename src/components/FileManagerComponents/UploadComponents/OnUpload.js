import React from "react";

function OnUpload({ percentage, uploaded, fileInfo, func, result }) {
  if (percentage === 100 || result !== null) return null;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="dropZone">
        <i className="ri-file-cloud-line"></i>
        <p>
          {uploaded} uploaded of {fileInfo.sizeStr}
        </p>
        <div className="uploadingBar-container">
          <div
            style={{ width: `${percentage}%` }}
            className="uploadingBar"
          ></div>
        </div>
        <button className="purple listBg" onClick={() => func()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OnUpload;
