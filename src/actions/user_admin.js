import store from "../store";
import axios from "axios";
import { AUTH_HEADER } from "./helper";
import { LOGERR, LOGINFO } from "./log";
const setUserAdmin = async () => {
  const { hostName, hostPath, validUsers } = store.getState().validUserReducer;
  const { name, address } = store.getState().serverReducer;

  const matched = validUsers.filter((item) => {
    return item.value === true;
  });

  const flag = matched.length < 1 ? false : true;
  const urlString = flag ? "/userAdmin/add/" : "/userAdmin/remove/";
  const user_name = flag ? matched[0].username : "";

  const block = {
    host_name: hostName,
    host_path: hostPath,
    server_name: name,
    server_address: address,
    username: user_name,
  };

  try {
    const res = await axios.post(urlString, block, AUTH_HEADER());

    if (res.data.status === false) {
      return {
        is_error: true,
        msg: res.data.msg,
      };
    }

    return {
      is_error: false,
      msg: "",
    };
  } catch (Error) {
    return {
      is_error: true,
      msg: Error.message,
    };
  }
};

export { setUserAdmin };
