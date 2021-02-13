import axios from "axios";
import store from "../store";
import { LOGINFO, LOGERR } from "./log";
import { AUTH_HEADER } from "../actions/helper";

const get_pending_users = async () => {
  try {
    const res = await axios.get(
      `/api/users/?${new URLSearchParams({ type: "pending" }).toString()}`,
      AUTH_HEADER()
    );
    if (res.data.status !== true) {
      throw Error("Error while fetching pending users.");
    }
    let x = res.data.users.map((item) => {
      return { ...item, value: false };
    });
    store.dispatch({ type: "STORE_PENDING_USER", data: x });
    LOGINFO(res.data.msg, "Pending User");
  } catch (Error) {
    LOGERR(Error.message);
  }
};

const remove_pending_users = async () => {};

const approve_pending_users = async () => {};

export { get_pending_users, remove_pending_users, approve_pending_users };
