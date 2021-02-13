import { React, useState } from "react";
import { useSelector } from "react-redux";
import { getServers, reFetchServer } from "../../actions/server";
import { create_host } from "../../actions/host";
import "../../styles/modal/list.scss";
import "../../styles/modal/addServer.scss";

const INIT = {
  name: "",
  path: "",
  writable: false,
  public: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function CreateHost({ func }) {
  const [iState, setIState] = useState(INIT);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);
  const serverData = useSelector((state) => state.serverReducer);

  const createHost = async () => {
    setBusy(true);
    const resObj = await create_host({
      name: iState.name,
      path: iState.path,
      writable: iState.writable,
      public: iState.public,
      server_name: serverData.name,
    });
    setErr(resObj);
    if (!resObj.is_error) {
      await getServers();
      await reFetchServer(serverData);
      func();
    }
    setBusy(false);
  };

  return (
    <>
      <div className="row addServerRow">
        <label htmlFor="addHostName">Host Name</label>
      </div>
      <div className="row addServerRow">
        <input
          type="text"
          onChange={(e) => {
            setIState({ ...iState, name: e.target.value });
          }}
          value={iState.name}
          name="addHostName"
          id="addHostName"
          required={true}
        ></input>
      </div>

      <div className="row addServerRow"></div>

      <div className="row addServerRow">
        <label htmlFor="addPath">Path</label>
      </div>
      <div className="row addServerRow">
        <input
          type="text"
          onChange={(e) => {
            setIState({ ...iState, path: e.target.value });
          }}
          value={iState.path}
          name="addPath"
          id="addPath"
          required={true}
        ></input>
      </div>

      <div className="row addServerRow"></div>

      <div className="row addServerRow">Configurations</div>
      <div className="row addServerRow">
        <input
          type="checkbox"
          onChange={(e) => {
            setIState({ ...iState, writable: e.target.value });
          }}
          name="writeAccessHost"
          id="writeAccessHost"
          value={iState.writable}
        ></input>
        <label htmlFor="writeAccessHost">Write access</label>
      </div>

      <div className="row addServerRow">
        <input
          type="checkbox"
          onChange={(e) => {
            setIState({ ...iState, public: e.target.value });
          }}
          name="publicAccessHost"
          id="publicAccessHost"
          value={iState.public}
        ></input>
        <label htmlFor="publicAccessHost">Public access</label>
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
            <button onClick={() => createHost()}>Create Host</button>
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

export default CreateHost;
