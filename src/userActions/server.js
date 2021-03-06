import store from "../store";
import axios from "axios";
import { AUTH_HEADER } from "../actions/helper";

async function getServers() {
  const loginInfo = store.getState().authReducer;
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_MASTER_URL}/user/servers/?username=${loginInfo.username}`,
      AUTH_HEADER()
    );
    if (res.status === 200) {
      let servers = res.data.data;
      servers = servers.map((item) => {
        delete item.admin;
        return item;
      });
      store.dispatch({ type: "STORE_SERVER_DATA", data: servers });
      store.dispatch({
        type: "STORE_SHARED_SERVER_DATA",
        data: res.data.shared,
      });
      //store.dispatch({ type: "RESET_ALIVE_COUNT" });
    } else {
      throw Error("Something went wrong while fetching server data");
    }
  } catch {
    //Pending
  }
}

export { getServers };
