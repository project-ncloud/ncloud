import axios from "axios";
import store from "../store";
import { AUTH_HEADER } from "./helper";
import { LOGINFO, LOGERR } from "./log";

const create_manager = async (block) => {
  try {
    //Data Validations
    if (
      block.name.trim() === "" ||
      block.username.trim() === "" ||
      block.password1.trim() === "" ||
      block.password2.trim() === ""
    ) {
      throw Error("Empty data");
    }

    //Password Validations
    if (block.password1 !== block.password2) {
      throw Error("Both passwords are not same");
    }

    const res = await axios.post(
      "/manager/",
      {
        name: block.name,
        username: block.username,
        password: block.password1,
      },
      AUTH_HEADER()
    );

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

const get_managers = async () => {
  try {
    const res = await axios.get("/managers/", AUTH_HEADER());
    if (res.data.status !== true) {
      throw Error("Error while fetching users.");
    }
    let x = res.data.managers.map((item) => {
      return { ...item, value: false };
    });
    store.dispatch({ type: "STORE_MANAGER", data: x });
    LOGINFO(res.data.msg, "NCloud Manager");
  } catch (Error) {
    LOGERR(Error.message, "NCloud Manager");
  }
};

const remove_manager = async (username) => {
  try {
    const res = await axios.delete("/manager/", AUTH_HEADER({ username }));
    if (res.data.status === true) {
      LOGINFO(`${username} removed from manager list`);
      return;
    }
    throw Error(res.data.msg);
  } catch (Error) {
    LOGERR(Error.message, "Manager");
  }
};

const remove_managers = async () => {
  const actionUsers = store
    .getState()
    .managerReducer.managers.filter((item) => {
      return item.value === true;
    });

  for (let i = 0; i < actionUsers.length; i++) {
    await remove_manager(actionUsers[i].username, "normal");
  }
  await get_managers();
};

export { create_manager, get_managers, remove_managers };
