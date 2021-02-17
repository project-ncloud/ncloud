import { React, useState } from "react";
import SideBar from "./FileManagerComponents/SideBar";
import Explorer from "./FileManagerComponents/Explorer";
import "../styles/fileManagerStyles.scss";

function FileManager() {
  const [state, setState] = useState({
    rootDir: "D:/save/",
  });

  return (
    <div className="fileManager">
      <SideBar />
      <Explorer />
    </div>
  );
}

export default FileManager;
