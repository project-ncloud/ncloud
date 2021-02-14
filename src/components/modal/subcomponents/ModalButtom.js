import React from "react";

function ModalButtom({ busy, children }) {
  return (
    <>
      <div className="row addServerRow buttonRow">
        {busy ? (
          <button
            className="subBg purple"
            style={{ color: "var(--sub-text-color)" }}
          >
            Please wait
          </button>
        ) : (
          children
        )}
      </div>
      <div className="row addServerRow"></div>
    </>
  );
}

export default ModalButtom;
