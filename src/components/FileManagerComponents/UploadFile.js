import axios, { CancelToken, isCancel } from "axios";
import { React, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { getExtension, getSizeStr, dirData } from "../../actions/explorer";
import { GET_ACCESS, GET_TOKEN, TIMEOUT } from "../../actions/helper";
import { LOGERR, LOGINFO } from "../../actions/log";
import DragFile from "./UploadComponents/DragFile";
import OnProcess from "./UploadComponents/OnProcess";
import OnUpload from "./UploadComponents/OnUpload";
import UploadFileInfo from "./UploadComponents/UploadFileInfo";
import UploadResult from "./UploadComponents/UploadResult";
import "../../styles/Explorer/uploadFile.scss";

function UploadFile({ func, show }) {
  const explorerPath = useSelector((state) => state.explorerReducer.path);
  const address = useSelector((state) => state.explorerControlReducer.address);
  const [fileAdded, setFileAdded] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const ref = useRef(null);
  const cancelFileUpload = useRef(null);

  //OnUpload States
  const [percentage, setPercentage] = useState(0);
  const [uploaded, setUploaded] = useState(getSizeStr(0));
  const [isUploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFileAdded(true);
    setFileInfo({
      name: acceptedFiles[0].name,
      extension: getExtension(acceptedFiles[0].name),
      size: acceptedFiles[0].size,
      sizeStr: getSizeStr(acceptedFiles[0].size),
    });
    ref.current = acceptedFiles[0];

    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const resetUpload = () => {
    setUploading(false);
    setUploadComplete(null);
    setUploaded(getSizeStr(0));
    setPercentage(0);
    setFileAdded(false);
    setFileInfo({});
    ref.current = null;
    func();
  };

  const handleFileUpload = async (e) => {
    setUploading(true);
    setUploadComplete(null);
    const formData = new FormData();
    formData.append("file", ref.current);
    try {
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const p = Math.floor((loaded * 100) / total);
          setPercentage(p);
          setUploaded(getSizeStr(loaded));
        },
        cancelToken: new CancelToken(
          (cancel) => (cancelFileUpload.current = cancel)
        ),
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${GET_TOKEN()}`,
        },
        params: { path: explorerPath, token: GET_ACCESS() },
      };
      const res = await axios.post(
        `http://${address}/file/upload/`,
        formData,
        options
      );
      if (res.status === 200) {
        dirData();
        setUploadComplete(true);
      } else {
        setUploadComplete(false);
        throw Error("Error ocurred while uploading file");
      }
      await TIMEOUT(2000);
      resetUpload();
      LOGINFO(res.data.message);
    } catch (error) {
      setUploadComplete(false);
      if (isCancel(error)) {
        LOGINFO("User cancelled the upload");
      } else {
        await TIMEOUT(2000);
      }
      resetUpload();
      LOGERR(error.message);
    }
  };

  const cancelUpload = () => {
    if (cancelFileUpload.current) {
      cancelFileUpload.current("Upload cancelled");
    }
  };

  return (
    <div className={`UploadFileContainer ${!show ? "hide" : null}`}>
      <div className="topBar">
        {uploadComplete === null && !isUploading ? (
          <i className="ri-close-fill" onClick={() => resetUpload()}></i>
        ) : (
          <i className="ri-close-fill" onClick={() => func()}></i>
        )}
      </div>
      {fileAdded && !isUploading ? (
        <UploadFileInfo fileInfo={fileInfo} func={handleFileUpload} />
      ) : !isUploading ? (
        <DragFile
          isDragActive={isDragActive}
          func={getRootProps}
          func2={getInputProps}
        />
      ) : (
        <>
          <OnUpload
            uploaded={uploaded}
            fileInfo={fileInfo}
            percentage={percentage}
            func={cancelUpload}
            result={uploadComplete}
          />
          <OnProcess percentage={percentage} result={uploadComplete} />
          <UploadResult result={uploadComplete} />
        </>
      )}
    </div>
  );
}

export default UploadFile;
