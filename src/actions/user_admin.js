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

const get_AddSharedUsers = () => {
  const validUsers = store.getState().explorerControlReducer.validUsers;
  const sharedUsers = store.getState().sharedUserReducer.users;
  const users = store.getState().userReducer.users;
  let excludeUsers = validUsers.map((item) => item);
  sharedUsers.forEach((item) => {
    excludeUsers.push(item.username);
  });
  const filteredUsers = users.filter((item) => {
    return !excludeUsers.includes(item.username);
  });
  return filteredUsers;
};

const add_shared_user = async (block) => {
  try {
    const res = await axios.post(
      "/userAdmin/sharedUser/",
      block,
      AUTH_HEADER()
    );
    if (res.status === 200) {
      if (!res.data.status) {
        throw Error(res.data.msg);
      }
      LOGINFO(res.data.msg);
      //store.dispatch({ type: "PUSH_SUSER", data: block.username });
    }
  } catch (Error) {
    LOGERR(Error.message);
  }
};

const remove_shared_user = async (block) => {
  try {
    const res = await axios.delete(
      "/userAdmin/sharedUser/",
      AUTH_HEADER(block)
    );
    if (res.status === 200) {
      if (!res.data.status) {
        throw Error(res.data.msg);
      }
      LOGINFO(res.data.msg);
      //store.dispatch({ type: "PUSH_SUSER", data: block.username });
    }
  } catch (Error) {
    LOGERR(Error.message);
  }
};

const changeSharedAccess = async (block) => {
  try {
    const res = await axios.post("/userAdmin/writable/", block, AUTH_HEADER());
    if (res.status === 200) {
      if (!res.data.status) {
        throw Error(res.data.msg);
      }
      LOGINFO(res.data.msg);
      return true;
      //store.dispatch({ type: "PUSH_SUSER", data: block.username });
    }
  } catch (Error) {
    LOGERR(Error.message);
    return false;
  }
};

export {
  setUserAdmin,
  get_AddSharedUsers,
  add_shared_user,
  remove_shared_user,
  changeSharedAccess,
};
