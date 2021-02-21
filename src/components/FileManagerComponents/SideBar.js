import axios from "axios";
import React from "react";

function SideBar() {
  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await axios.post(
        "http://127.0.0.1:6900/file/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: { path: "D:/save" }, // change path here
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fSideBar">
      <i className="ri-hard-drive-fill"></i>
      <label htmlFor="file-input">
        <i className="ri-add-line">
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </i>
      </label>
      <i className="ri-folder-add-line"></i>
      <i className="ri-share-forward-line"></i>
    </div>
  );
}

export default SideBar;
