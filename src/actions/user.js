import axios from "axios";
import store from "../store";
import { LOGINFO, LOGERR } from "./log";
import { AUTH_HEADER } from "../actions/helper";
import { removeUser, get_pending_users } from "./pending_user";

const get_users = async () => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_MASTER_URL + "/api/users/",
      AUTH_HEADER()
    );
    if (res.data.status !== true) {
      throw Error("Error while fetching users.");
    }
    let x = res.data.users.map((item) => {
      return { ...item, value: false };
    });
    store.dispatch({ type: "STORE_USER", data: x });
    LOGINFO(res.data.msg, "NCloud User");
  } catch (Error) {
    LOGERR(Error.message, "NCloud User");
  }
};

const remove_users = async () => {
  const actionUsers = store.getState().userReducer.users.filter((item) => {
    return item.value === true;
  });

  for (let i = 0; i < actionUsers.length; i++) {
    await removeUser(actionUsers[i].username, "normal");
  }

  await get_pending_users();
  await get_users();
};

export { get_users, remove_users };
