import React from "react";

function ModalButton({ onClick, name, type2 = false }) {
  return (
    <button className={type2 ? "subBg purple" : null} onClick={onClick}>
      {name}
    </button>
  );
}

export default ModalButton;
