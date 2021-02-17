import { React, useState } from "react";
import "../../styles/container/serverSection.scss";
import { useSelector, useDispatch } from "react-redux";
import HostContainer from "./HostContainer";
import { removeServer } from "../../actions/server";

function ServerSection({ toggle }) {
  const serverData = useSelector((state) => state.serverReducer);
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  const removeServerReact = async (name, address) => {
    setBusy(true);
    await removeServer(name, address);
    setBusy(false);
  };

  const servrPref = () => {
    dispatch({ type: "TOGGLE_SERVER_PREFERENCES", data: true });
  };

  return (
    <section className={`server ${toggle ? null : "hide"}`} id="serverName">
      <div className="sectionTitle purple">Server Info</div>
      <div className="info serverInfo">
        <div>
          <i className="ri-server-fill"></i>
          {serverData.name}
        </div>
        <div>
          <i className="ri-link"></i>
          {serverData.address}
        </div>
        <div>
          {!busy ? (
            <>
              <i
                className="ri-settings-3-fill btn"
                onClick={() => servrPref()}
              ></i>
              <i
                className="ri-delete-bin-2-line btn"
                onDoubleClick={() =>
                  removeServerReact(serverData.name, serverData.address)
                }
              >
                <p>Remove Server</p>
              </i>
            </>
          ) : (
            <i
              className="ri-delete-bin-2-line btn"
              style={{ color: "var(--sub-text-color)" }}
            >
              <p>Please wait</p>
            </i>
          )}
        </div>
      </div>
      <div className="sectionTitle purple subtitle">Hosts</div>
      <HostContainer data={serverData.hosts} />
    </section>
  );
}

export default ServerSection;
