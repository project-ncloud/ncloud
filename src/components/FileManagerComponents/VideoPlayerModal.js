import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import "../../styles/Explorer/videoPlayer.scss";

const VideoPlayerModal = ({ videoPlayerState }) => {
  const dispatch = useDispatch();

  return (
    <div className="player-wrapper">
      <div
        className="close-icon red"
        onClick={() => dispatch({ type: "TOGGLE_VIDEO_MODAL" })}
      >
        <i className="ri-close-line" />
      </div>
      <h1>Playing Audio...</h1>
      <ReactPlayer
        onEnded={() => dispatch({ type: "TOGGLE_VIDEO_MODAL" })}
        playing
        className="react-player"
        url={videoPlayerState.url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};

export default VideoPlayerModal;
