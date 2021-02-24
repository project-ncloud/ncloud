import { useDispatch } from "react-redux";
import "../../styles/Explorer/audioPlayer.scss";

const AudioPlayerModal = ({ audioPlayerState }) => {
  const dispatch = useDispatch();

  return (
    <div className="audio-player-wrapper">
      <div
        className="close-icon red"
        onClick={() => dispatch({ type: "TOGGLE_AUDIO_MODAL" })}
      >
        <i className="ri-close-line" />
      </div>
      <h1>{audioPlayerState.name}</h1>
      <audio
        style={{ width: "100%" }}
        controls
        autoPlay={Boolean(true)}
        playing={Boolean(true)}
        src={audioPlayerState.url}
        onEnded={() => dispatch({ type: "TOGGLE_AUDIO_MODAL" })}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
};

export default AudioPlayerModal;
