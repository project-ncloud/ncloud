import React from "react";

function ModalError({ error, msg }) {
  return (
    <div className="row addServerRow errRow" style={{ color: "var(--red)" }}>
      {error ? <p>{msg}</p> : null}
    </div>
  );
}

export default ModalError;
