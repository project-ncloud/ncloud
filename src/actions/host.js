import axios from "axios";
import store from "../store";
import { AUTH_HEADER } from "./helper";

const create_host = async (block) => {
  try {
    //Data Validations
    if (
      block.name.trim() === "" ||
      block.path.trim() === "" ||
      block.server_name.trim() === ""
    ) {
      throw Error("Empty data");
    }

    const res = await axios.post("/server/host/", block, AUTH_HEADER());

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

const remove_host = async (block) => {
  try {
    const res = await axios.delete("/server/host/", AUTH_HEADER(block));

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

const get_name = (username) => {
  const users = store.getState().userReducer.users;

  const match = users.filter((item) => {
    return item.username === username;
  });

  if (match.length < 1) {
    return "N/A";
  } else {
    return match[0].name;
  }
};

export { create_host, remove_host, get_name };
