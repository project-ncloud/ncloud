import { React } from "react";
import SideBar from "./FileManagerComponents/SideBar";
import Explorer from "./FileManagerComponents/Explorer";
import "../styles/fileManagerStyles.scss";

function FileManager() {
  return (
    <div className="fileManager">
      <SideBar />
      <Explorer />
    </div>
  );
}

export default FileManager;
