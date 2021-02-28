import { useDispatch } from "react-redux";
import "../../styles/Explorer/imageViewer.scss";

const ImageViewerModal = ({ imageViewerState }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="image-wrapper"
      style={{ backgroundImage: `url(${imageViewerState.url})` }}
    >
      <div
        className="close-icon red"
        onClick={() => dispatch({ type: "TOGGLE_IMAGE_MODAL" })}
      >
        <i className="ri-close-line" />
      </div>
      <h1 className="image-title">{imageViewerState.name}</h1>
    </div>
  );
};

export default ImageViewerModal;
