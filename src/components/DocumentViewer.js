import React from "react";
import FileViewer from "react-file-viewer";
import "../styles/Explorer/documentViewer.scss";

function DocumentViewer(state) {
  return (
    <div className="fileViewer">
      <FileViewer
        props={{ allowFullScreen: true }}
        fileType={state.history.location.state.type}
        filePath={state.history.location.state.url}
      />
    </div>
  );
}

export default DocumentViewer;
