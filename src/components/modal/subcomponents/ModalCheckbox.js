import { React } from "react";

function ModalCheckbox({ name, data, icon, func, cKey }) {
  return (
    <>
      <div className="row checkboxRow">
        <label htmlFor={cKey}>
          <div className="labelInfo">
            {icon}
            {name}
          </div>
          <input
            type="checkbox"
            name={cKey}
            id={cKey}
            value={data}
            checked={Boolean(data)}
            onChange={func}
          ></input>
        </label>
      </div>
    </>
  );
}

export default ModalCheckbox;
