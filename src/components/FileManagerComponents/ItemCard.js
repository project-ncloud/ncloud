import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getIco } from "../../actions/explorer";
import { GET_ACCESS, GET_QUERY, GET_TOKEN } from "../../actions/helper";

const icoStyle = { marginRight: "15px", fontSize: "20px" };

const ItemCard = ({
  name,
  path,
  isDir,
  extension,
  date,
  size,
  up = false,
  upFunc,
  downFunc,
  back,
  setVideoPlayerState,
  setAudioPlayerState,
  setImageViewerState,
  listView,
  searchStr = "",
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { writable, address } = useSelector(
    (state) => state.explorerControlReducer
  );

  if (
    !(
      searchStr === "" ||
      name.toUpperCase().indexOf(searchStr.toUpperCase()) > -1
    )
  )
    return null;

  const dummyFunc = () => {
    return;
  };

  //
  const longPath = name.split("/");
  const file_name = longPath[longPath.length - 1];
  longPath.pop();

  const download = () => {
    const params = {
      path: path,
      file_name: file_name,
      token: GET_ACCESS(),
      m_token: GET_TOKEN(),
    };
    const link = document.createElement("a");
    link.href = `http://${address}/testRoute/?${GET_QUERY(params)}`;
    link.target = "blank";
    link.click();
  };

  const getName = (fileName) => {
    return fileName.substr(0, fileName.lastIndexOf("."));
  };

  return (
    <>
      <ContextMenuTrigger id={name + extension + size + "contextMenu"}>
        <div
          className={`card ${listView ? "card-list" : null}`}
          onClick={() => {
            up ? upFunc() : dummyFunc();
          }}
          onDoubleClick={() => {
            isDir ? downFunc(name) : up ? back() : dummyFunc();
          }}
        >
          {getIco(extension?.toLowerCase(), isDir, up)}
          <p className="fName">{name}</p>
          {!up && !isDir ? <p className="fSize">{size}</p> : false}
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={name + extension + size + "contextMenu"}>
        <>
          {isDir ? (
            <MenuItem
              onClick={() => {
                downFunc(name);
              }}
            >
              <i className="ri-folder-line purple" style={icoStyle}></i>
              Open
            </MenuItem>
          ) : up ? (
            <MenuItem onClick={upFunc}>
              <i className="ri-arrow-go-back-line" style={icoStyle}></i>
              Go back
            </MenuItem>
          ) : (
            <MenuItem onClick={download}>
              <i className="ri-download-cloud-2-line cyan" style={icoStyle}></i>
              Download
            </MenuItem>
          )}

          {!isDir &&
            ".3gp.avi.flv.h264.mkv.m4v.mov.mp4.webm.mpg.mpeg.swf.rm.vob.wmv".includes(
              extension
            ) && (
              <MenuItem
                onClick={() => {
                  setVideoPlayerState({
                    url: `http://${address}/testRoute/?${GET_QUERY({
                      path: path,
                      file_name: file_name,
                      token: GET_ACCESS(),
                      m_token: GET_TOKEN(),
                    })}`,
                  });
                  dispatch({ type: "TOGGLE_VIDEO_MODAL" });
                }}
              >
                <i className="ri-play-fill purple" style={icoStyle}></i>
                Play
              </MenuItem>
            )}

          {!isDir && ".mp3.m4a.wav.aif.midi.ogg.mpa.wma".includes(extension) && (
            <MenuItem
              onClick={() => {
                setAudioPlayerState({
                  url: `http://${address}/testRoute/?${GET_QUERY({
                    path: path,
                    file_name: file_name,
                    token: GET_ACCESS(),
                    m_token: GET_TOKEN(),
                  })}`,
                  name: getName(file_name),
                });
                dispatch({ type: "TOGGLE_AUDIO_MODAL" });
              }}
            >
              <i className="ri-play-fill purple" style={icoStyle}></i>
              Play
            </MenuItem>
          )}

          {!isDir &&
            ".jpg.jpeg.bmp.png.svg".includes(extension?.toLowerCase()) && (
              <MenuItem
                onClick={() => {
                  setImageViewerState({
                    url: `http://${address}/testRoute/?${GET_QUERY({
                      path: path,
                      file_name: file_name,
                      token: GET_ACCESS(),
                      m_token: GET_TOKEN(),
                    })}`,
                    name: getName(file_name),
                  });
                  dispatch({ type: "TOGGLE_IMAGE_MODAL" });
                }}
              >
                <i className="ri-play-fill purple" style={icoStyle}></i>
                View
              </MenuItem>
            )}

          {!isDir && ".docx.pdf".includes(extension?.toLowerCase()) && (
            <MenuItem
              onClick={() => {
                const BLK = {
                  url: `http://${address}/testRoute/?${GET_QUERY({
                    path: path,
                    file_name: file_name,
                    token: GET_ACCESS(),
                    m_token: GET_TOKEN(),
                  })}`,
                  name: getName(file_name),
                  type: extension.substr(1, extension.length),
                };

                history.push("/view", BLK);
              }}
            >
              <i className="ri-play-fill purple" style={icoStyle}></i>
              Open Document
            </MenuItem>
          )}

          {up || !writable ? null : (
            <MenuItem>
              <i className="ri-delete-bin-line red" style={icoStyle}></i>
              {isDir ? "Remove Folder" : "Remove File"}
            </MenuItem>
          )}
        </>
      </ContextMenu>
    </>
  );
};

export default ItemCard;
