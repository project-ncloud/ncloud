import { React } from "react";

function ModalCheckbox({ name, data, icon, func, key }) {
  return (
    <>
      <div className="row checkboxRow">
        <label htmlFor={key}>
          <div className="labelInfo">
            {icon}
            {name}
          </div>
          <input
            type="checkbox"
            name={key}
            id={key}
            value={data}
            checked={Boolean(data)}
            onClick={func}
          ></input>
        </label>
      </div>
    </>
  );
}

export default ModalCheckbox;
