import { React, useState } from "react";
import SideBar from "./FileManagerComponents/SideBar";
import Explorer from "./FileManagerComponents/Explorer";
import "../styles/fileManagerStyles.scss";
import UploadFile from "./FileManagerComponents/UploadFile";
import { useSelector } from "react-redux";
import CreateFolder from "./FileManagerComponents/CreateFolder";

function FileManager() {
  const explorerConstant = useSelector((state) => state.explorerControlReducer);
  const [showUpload, setShowUpload] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const toggleUploadPanel = () => {
    setShowUpload(!showUpload);
  };
  const toggleCreateFolderPanel = () => {
    setShowCreateFolder(!showCreateFolder);
  };
  return (
    <div className="fileManager">
      <SideBar func={toggleUploadPanel} func2={toggleCreateFolderPanel} />
      <Explorer />
      <UploadFile
        show={showUpload && explorerConstant.writable}
        func={toggleUploadPanel}
      />
      <CreateFolder
        show={showCreateFolder && explorerConstant.writable}
        func={toggleCreateFolderPanel}
      />
    </div>
  );
}

export default FileManager;
