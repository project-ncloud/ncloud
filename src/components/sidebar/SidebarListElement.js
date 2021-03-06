import { React, useEffect, useState } from "react";
import axios from "axios";

import { getServerStatus } from "../../actions/server";
import "../../styles/sidebar/listItem.scss";

function SidebarListElement({ data, func }) {
  const [state, setState] = useState(false);
  useEffect(() => {
    async function xx() {
      const serverStatus = await getServerStatus(data.address);
      setState(serverStatus);
    }
    xx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleServer = async (address) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_MASTER_URL + "/server/control/",
        {
          address: address,
          action: !state,
        }
      );
      if (res.status === 200) {
        setState(!state);
        return;
      }
      throw Error("Unable to toggle the server control");
    } catch {
      setState(state);
    }
  };

  return (
    <div className="listElement">
      <div className="title">{data.name}</div>
      <div className="invisibleButton" onClick={func}></div>
      <div className="bar">
        <input
          type="checkbox"
          id={`${data.name + data.address}_toggle`}
          className="checkbox"
          checked={state}
          onChange={() => toggleServer(data.address)}
        />
        <label
          htmlFor={`${data.name + data.address}_toggle`}
          className="toggle"
        >
          <i className="ri-shut-down-line btnON"></i>
        </label>
      </div>
    </div>
  );
}

export default SidebarListElement;
