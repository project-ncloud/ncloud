import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ItemContainer from "./ItemContainer";
import PathBar from "./PathBar";
import Modals from "../Modals";
import VideoPlayerModal from "./VideoPlayerModal";
import UserModals from "../UserModals";

function Explorer() {
  const path = useSelector((state) => state.explorerReducer.path);
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const toggleModal = useSelector((state) => state.modalReducer);

  useEffect(() => {
    if (explorerConst.path === "") {
      history.push("/user");
    }
  });

  useEffect(() => {
    const openDrive = async () => {
      try {
        const res = await axios.get(`http://${explorerConst.address}/dir/`, {
          params: { path },
        });
        if (res.status === 200) {
          dispatch({ type: "STORE_EXPLORER_DATA", data: res.data });
        }
      } catch (Error) {}
    };
    openDrive();
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

  return (
    <>
      <div className="fExplorer">
        {toggleModal.show_video_modal && (
          <VideoPlayerModal videoPlayerState={videoPlayerState} />
        )}
        <div className="fHeader fPadding">
          <h1>Explorer</h1>
        </div>
        <PathBar path={path} />
        <ItemContainer
          path={path}
          upFunc={upDir}
          downFunc={downDir}
          back={myhome}
          setVideoPlayerState={setVideoPlayerState}
        />
      </div>
      <UserModals />
    </>
  );
}

export default Explorer;
