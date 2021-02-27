import axios from "axios";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { getExtension, getSizeStr, dirData } from "../../actions/explorer";
import {
  AUTH_HEADER,
  GET_ACCESS,
  GET_TOKEN,
  TIMEOUT,
} from "../../actions/helper";
import "../../styles/Explorer/createFolder.scss";
import CreateFolderResult from "./UploadComponents/CreateFolderResult";
import OnProcess from "./UploadComponents/OnProcess";

function CreateFolder({ func, show }) {
  const explorerPath = useSelector((state) => state.explorerReducer.path);
  const address = useSelector((state) => state.explorerControlReducer.address);
  const [folderName, setFolderName] = useState("");
  const [result, setResult] = useState(null);
  const [onCreate, setOnCreate] = useState(false);

  const validationFolderName = (e) => {
    // eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line no-control-regex
    const vRegX = /[<>:"\/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/i;
    const value = e.target.value;
    if (!vRegX.test(value)) {
      setFolderName(value);
    }
  };

  const createFolder = async () => {
    setOnCreate(true);
    try {
      const res = await axios.post(
        `http://${address}/dir/create/`,
        {
          path: explorerPath,
          folder_name: folderName,
          token: GET_ACCESS(),
        },
        AUTH_HEADER()
      );
      if (res.status === 200) {
        await dirData();
        setOnCreate(false);
        setResult(true);
      } else {
        throw Error("Error ocurred while creating folder");
      }
    } catch (Error) {
      setOnCreate(false);
      setResult(false);
    }
    await TIMEOUT(2000);
    setFolderName("");
    setResult(null);
    func();
  };
  return (
    <div className={`wrapper ${!show ? "hide" : null}`}>
      <div className="overlayWrapper" onClick={func}></div>
      <div className="CreateFolderContainer">
        <div className="topBar">
          <i className="ri-close-fill" onClick={() => func()}></i>
        </div>
        {result === null && !onCreate ? (
          <label className="dropZone" htmlFor="createFolder">
            <i className="ri-folder-add-fill"></i>
            <p>Create folder name</p>
            <input
              className="create-folder-input"
              id="createFolder"
              type="text"
              onChange={validationFolderName}
              value={folderName}
              placeholder="Write Here"
            ></input>
            <button className="purple listBg" onClick={() => createFolder()}>
              Create
            </button>
          </label>
        ) : result != null && !onCreate ? (
          <CreateFolderResult result={result} />
        ) : (
          <OnProcess result={result} />
        )}
      </div>
    </div>
  );
}

export default CreateFolder;
