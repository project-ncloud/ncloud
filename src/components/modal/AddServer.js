import { React, useState } from "react";
import add_server from "../../actions/add_server";
import { getServers } from "../../actions/server";
import "../../styles/modal/list.scss";
import "../../styles/modal/addServer.scss";

const INIT = {
  server_name: "",
  server_address: "",
  auto_start: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function AddServer({ func }) {
  const [iState, setIState] = useState(INIT);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  const server = async () => {
    setBusy(true);
    const resObj = await add_server({
      name: iState.server_name,
      address: iState.server_address,
      auto_start: iState.auto_start,
    });

    setErr(resObj);

    if (!resObj.is_error) {
      await getServers();
      func();
    }
    setBusy(false);
  };

  return (
    <>
      <div className="row addServerRow">
        <label htmlFor="addServerName">Server Name</label>
      </div>
      <div className="row addServerRow">
        <input
          type="text"
          onChange={(e) => {
            setIState({ ...iState, server_name: e.target.value });
          }}
          value={iState.server_name}
          name="addServerName"
        ></input>
      </div>

      <div className="row addServerRow"></div>

      <div className="row addServerRow">
        <label htmlFor="addServerAddress">Address</label>
      </div>
      <div className="row addServerRow">
        <input
          type="text"
          onChange={(e) => {
            setIState({ ...iState, server_address: e.target.value });
          }}
          value={iState.server_address}
          name="addServerAddress"
          id="addServerAddress"
        ></input>
      </div>

      <div className="row addServerRow"></div>

      <div className="row addServerRow">Configurations</div>
      <div className="row addServerRow">
        <input
          type="checkbox"
          value={iState.auto_start}
          onChange={(e) => {
            setIState({ ...iState, auto_start: Boolean(e.target.value) });
          }}
          name="addAutoStart"
          id="addAutoStart"
        ></input>
        <label htmlFor="addAutoStart">Auto Start</label>
      </div>

      <div className="row addServerRow errRow" style={{ color: "var(--red)" }}>
        {error.is_error ? <p>{error.msg}</p> : null}
      </div>
      <div className="row addServerRow buttonRow">
        {!busy ? (
          <>
            <button
              className="subBg purple"
              onClick={() => {
                setIState(INIT);
                setErr(ERR_OBJ);
              }}
            >
              Clear
            </button>
            <button onClick={() => server()}>Add Server</button>
          </>
        ) : (
          <button
            className="subBg purple"
            style={{ color: "var(--sub-text-color)" }}
          >
            Please wait
          </button>
        )}
      </div>
      <div className="row addServerRow"></div>
    </>
  );
}

export default AddServer;
