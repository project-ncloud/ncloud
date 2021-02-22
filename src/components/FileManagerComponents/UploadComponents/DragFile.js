import React from "react";

function DragFile({ func, func2, isDragActive }) {
  return (
    <div style={{ width: "100%", height: "100%" }} {...func()}>
      <input {...func2()} />
      {isDragActive ? (
        <div className="dropZone">
          <i class="ri-file-cloud-fill"></i>
          <p>Drop the files here ...</p>
        </div>
      ) : (
        <div className="dropZone">
          <i class="ri-file-cloud-line"></i>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default DragFile;
