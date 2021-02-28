import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import PathBar from "./PathBar";
import VideoPlayerModal from "./VideoPlayerModal";
import UserModals from "../UserModals";
import AudioPlayerModal from "./AudioPlayerModal";
import { GET_ACCESS, GET_AUTH_HEADER } from "../../actions/helper";
import ExplorerCustomization from "./ExplorerCustomization";
import ImageViewerModal from "./ImageVIewerModal";

function Explorer() {
  const path = useSelector((state) => state.explorerReducer.path);
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const toggleModal = useSelector((state) => state.modalReducer);

  const [listView, setListView] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [alphaSort, setAlphaSort] = useState(true);

  useEffect(() => {
    if (explorerConst.path === "") {
      history.push("/user");
    }
  });

  useEffect(() => {
    const openDrive = async () => {
      try {
        const res = await axios.get(
          `http://${explorerConst.address}/dir/`,
          GET_AUTH_HEADER({
            path: path,
            token: GET_ACCESS(),
          })
        );
        if (res.status === 200) {
          dispatch({ type: "STORE_EXPLORER_DATA", data: res.data });
        }
      } catch (Error) {}
    };
    return openDrive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, path]);

  const downDir = (name) => {
    dispatch({ type: "STORE_EXPLORER_PATH", data: path + "/" + name });
  };

  const upDir = () => {
    if (path !== explorerConst.path) {
      dispatch({
        type: "STORE_EXPLORER_PATH",
        data: path.substring(0, path.lastIndexOf("/")),
      });
    }
  };

  const myhome = () => {
    if (path === explorerConst.path) history.goBack();
  };

  const [videoPlayerState, setVideoPlayerState] = useState({
    url: null,
  });

  const [audioPlayerState, setAudioPlayerState] = useState({
    url: null,
  });

  const [imageViewerState, setImageViewerState] = useState({
    name: "",
    url: null,
  });

  return (
    <>
      <div className="fExplorer">
        {toggleModal.show_video_modal && (
          <VideoPlayerModal videoPlayerState={videoPlayerState} />
        )}
        {toggleModal.show_audio_modal && (
          <AudioPlayerModal audioPlayerState={audioPlayerState} />
        )}
        {toggleModal.show_image_modal && (
          <ImageViewerModal imageViewerState={imageViewerState} />
        )}
        <div className="fHeader fPadding">
          <h1>Explorer</h1>
        </div>
        <ExplorerCustomization
          listView={listView}
          setListView={setListView}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          setAlphaSort={setAlphaSort}
          sort={alphaSort}
        />
        <PathBar path={path} />

        <ItemContainer
          path={path}
          upFunc={upDir}
          downFunc={downDir}
          back={myhome}
          setVideoPlayerState={setVideoPlayerState}
          setAudioPlayerState={setAudioPlayerState}
          setImageViewerState={setImageViewerState}
          listView={listView}
          searchStr={searchStr}
          sort={alphaSort}
        />
      </div>
      <UserModals />
    </>
  );
}

export default Explorer;
