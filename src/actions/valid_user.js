import axios from "axios";
import store from "../store";
import { LOGINFO, LOGERR } from "./log";
import { AUTH_HEADER } from "../actions/helper";
import { get_pending_users } from "./pending_user";
import { get_users } from "./user";
import { getServers, reFetchServer } from "./server";

const get_validUsers = async () => {
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

const add_validUsers = async () => {
  const actionUsers = store
    .getState()
    .filteredoutUserReducer.users.filter((item) => {
      return item.value === true;
    });

  const address = store.getState().serverReducer.address;
  const name = store.getState().serverReducer.name;
  const hostname = store.getState().validUserReducer.hostName;

  const users = [];
  actionUsers.forEach((item) => {
    users.push(item.username);
  });

  if (users.length < 1) {
    return;
  }

  try {
    const res = await axios.post(
      process.env.REACT_APP_MASTER_URL + "/server/host/users/",
      {
        users,
        address,
        hostname,
      },
      AUTH_HEADER()
    );
    if (res.data.status === true) {
      users.forEach((item) => {
        LOGINFO(`${item} are added into valid users list`, hostname);
      });
    } else {
      throw Error(res.data.msg);
    }
  } catch (Error) {
    LOGERR(Error.message, "Valid User");
  }

  await get_pending_users();
  await get_users();
  await getServers();
  await reFetchServer({ name, address });
};

const remove_validUsers = async () => {
  const actionUsers = store
    .getState()
    .validUserReducer.validUsers.filter((item) => {
      return item.value === true;
    });

  const address = store.getState().serverReducer.address;
  const name = store.getState().serverReducer.name;
  const hostname = store.getState().validUserReducer.hostName;

  const users = [];
  actionUsers.forEach((item) => {
    users.push(item.username);
  });

  if (users.length < 1) {
    return;
  }

  try {
    const res = await axios.delete(
      process.env.REACT_APP_MASTER_URL + "/server/host/users/",
      AUTH_HEADER({
        users,
        address,
        hostname,
      })
    );
    if (res.data.status === true) {
      users.forEach((item) => {
        LOGINFO(`${item} are removed from valid users list`, hostname);
      });
    } else {
      throw Error(res.data.msg);
    }
  } catch (Error) {
    LOGERR(Error.message, "Valid User");
  }

  await get_pending_users();
  await get_users();
  await getServers();
  await reFetchServer({ name, address });
};

const filterOutUsers = () => {
  const users = store.getState().userReducer.users;
  const validUsers = store.getState().validUserReducer.validUsers;
  let validArr = [];
  validUsers.forEach((item) => {
    validArr.push(item.username);
  });

  const dataF = users.filter((item) => {
    return validArr.includes(item.username) === false;
  });

  store.dispatch({ type: "STORE_FUSER", data: dataF });
};

export { get_validUsers, remove_validUsers, filterOutUsers, add_validUsers };
