import React from "react";

function ModalText({ name, forName, func, value, type = "text" }) {
  return (
    <>
      <div className="row addServerRow">
        <label htmlFor={forName}>{name}</label>
      </div>
      <div className="row addServerRow">
        <input
          type={type}
          onChange={func}
          value={value}
          name={forName}
          id={forName}
        ></input>
      </div>
      <div className="row addServerRow"></div>
    </>
  );
}

export default ModalText;
