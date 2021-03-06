import axios from "axios";
import store from "../store";
import { AUTH_HEADER } from "./helper";
import { LOGINFO, LOGERR, LOGWARN } from "./log";

async function getServers() {
  try {
    const res = await axios.get(process.env.REACT_APP_MASTER_URL + "/servers/");
    console.log(res);
    if (res.status === 200) {
      store.dispatch({ type: "STORE_SERVER_DATA", data: res.data });
      store.dispatch({ type: "RESET_ALIVE_COUNT" });
    } else {
      throw Error("Something went wrong while fetching server data");
    }
  } catch {
    //Pending
  }
}

async function reFetchServer(item) {
  const state = store.getState().serversReducer;
  const getItem = state.filter((server) => {
    return server.name === item.name && server.address === item.address;
  });
  if (getItem.length > 0) {
    store.dispatch({ type: "STORE_SERVER", data: getItem[0] });
  } else {
    store.dispatch({ type: "TOGGLE_UI", data: "showDashboard" });
  }
}

async function getServerStatus(address) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_MASTER_URL}/server/control/${address}`
    );
    if (res.status === 200 && res.data.status === true) {
      if (res.data.is_running) {
        LOGINFO(`${address} is running`);
        store.dispatch({ type: "ADD_ALIVE_COUNT" });
        return true;
      }
    }
    throw Error("Server is not running");
  } catch (Error) {
    LOGWARN(`${address} is not running`);
    store.dispatch({ type: "ADD_ONLY_COUNT" });
    return false;
  }
}

const removeServer = async (name, address) => {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_MASTER_URL + "/server/",
      AUTH_HEADER({
        name: name,
        address: address,
      })
    );

    if (res.status === 400 || res.data.status === false) {
      throw Error("Error ocurred while removing the host.");
    }
    store.dispatch({ type: "TOGGLE_UI", data: "showDashboard" });
    await getServers();
    LOGINFO(`${name} removed`);
  } catch (Error) {
    LOGERR(Error.message);
  }
};

export { getServers, reFetchServer, getServerStatus, removeServer };
