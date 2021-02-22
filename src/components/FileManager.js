import { React, useState } from "react";
import SideBar from "./FileManagerComponents/SideBar";
import Explorer from "./FileManagerComponents/Explorer";
import "../styles/fileManagerStyles.scss";
import UploadFile from "./FileManagerComponents/UploadFile";
import { useSelector } from "react-redux";

function FileManager() {
  const explorerConstant = useSelector((state) => state.explorerControlReducer);
  const [showUpload, setShowUpload] = useState(false);

  const toggleUploadPanel = () => {
    setShowUpload(!showUpload);
  };
  return (
    <div className="fileManager">
      <SideBar
        func={explorerConstant.writable ? toggleUploadPanel : () => {}}
      />
      <Explorer />
      <UploadFile
        show={showUpload && explorerConstant.writable}
        func={toggleUploadPanel}
      />
    </div>
  );
}

export default FileManager;
