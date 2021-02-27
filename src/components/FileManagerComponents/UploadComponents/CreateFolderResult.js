import React from "react";

function CreateFolderResult({ result }) {
  if (result === null) return null;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="dropZone">
        <i
          className={`${
            result
              ? "ri-checkbox-circle-line purple"
              : "ri-file-warning-line red"
          }`}
        ></i>
        <p>{result ? "Folder Created" : "Error Occurred"}</p>
      </div>
    </div>
  );
}

export default CreateFolderResult;
