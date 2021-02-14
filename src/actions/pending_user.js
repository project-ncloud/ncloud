import axios from "axios";
import store from "../store";
import { LOGINFO, LOGERR } from "./log";
import { AUTH_HEADER } from "../actions/helper";
import { get_users } from "./user";

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

const removeUser = async (username, type = "pending") => {
  try {
    const res = await axios.delete(
      "/api/user/",
      AUTH_HEADER({
        username,
        type,
      })
    );
    if (res.data.status === true) {
      LOGINFO(`${username} removed from ${type} list`);
      return;
    }
    throw Error(res.data.msg);
  } catch (Error) {
    LOGERR(Error.message, "Pending User");
  }
};

const approveUser = async (username, type = "pending") => {
  try {
    const res = await axios.post(
      "/api/user/",
      {
        username,
        type,
      },
      AUTH_HEADER()
    );
    if (res.data.status === true) {
      LOGINFO(`${username} added as user`);
      return;
    }
    throw Error(res.data.msg);
  } catch (Error) {
    LOGERR(Error.message, "Pending User");
  }
};

const remove_pending_users = async () => {
  const actionUsers = store
    .getState()
    .pendingUserReducer.pending_users.filter((item) => {
      return item.value === true;
    });

  for (let i = 0; i < actionUsers.length; i++) {
    await removeUser(actionUsers[i].username);
  }

  await get_pending_users();
  await get_users();
};

const approve_pending_users = async () => {
  const actionUsers = store
    .getState()
    .pendingUserReducer.pending_users.filter((item) => {
      return item.value === true;
    });
  for (let i = 0; i < actionUsers.length; i++) {
    await approveUser(actionUsers[i].username);
  }
  await get_pending_users();
  await get_users();
};

export {
  get_pending_users,
  remove_pending_users,
  approve_pending_users,
  removeUser,
};
