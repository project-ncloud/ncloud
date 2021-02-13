import axios from "axios";
import store from "../store";
import { LOGINFO, LOGERR } from "./log";
import { AUTH_HEADER } from "../actions/helper";

const get_users = async () => {
  try {
    const res = await axios.get("/api/users/", AUTH_HEADER());
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

const remove_users = async () => {};

export { get_users, remove_users };
