import React from "react";

function OnProcess({ percentage, result }) {
  if (percentage !== 100 || result !== null) return null;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="dropZone">
        <i className="ri-loader-2-line"></i>
        <p>Processing Please Wait</p>
        <div className="uploadingBar-container">
          <div
            style={{ width: `${percentage}%` }}
            className="uploadingBar uploadingBar-anima"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default OnProcess;
