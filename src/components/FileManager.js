import { React, useState } from "react";
import SideBar from "./FileManagerComponents/SideBar";
import Explorer from "./FileManagerComponents/Explorer";
import "../styles/fileManagerStyles.scss";
import UploadFile from "./FileManagerComponents/UploadFile";

function FileManager() {
  const [showUpload, setShowUpload] = useState(false);
  const [canWrite, setWrite] = useState(true);

  const toggleUploadPanel = () => {
    setShowUpload(!showUpload);
  };
  return (
    <div className="fileManager">
      <SideBar func={toggleUploadPanel} />
      <Explorer />
      <UploadFile show={showUpload} func={toggleUploadPanel} />
    </div>
  );
}

export default FileManager;
