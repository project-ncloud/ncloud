import axios from "axios";
import store from "../store";
import { AUTH_HEADER, SET_TOKEN } from "./helper";

const INITIAL_VALUE = {
  username: "",
  name: "",
  is_manager: null,
  is_admin: null,
};

const LOGIN = async (data) => {
  try {
    const is_adminReq = data.username.toLowerCase() === "admin" ? true : false;
    const res = await axios.post(is_adminReq ? "/admin/" : "/login/", {
      username: data.username.toLowerCase(),
      password: data.password,
    });
    const dataN = res.data;
    if (
      res.status !== 200 ||
      dataN.status === false ||
      (!is_adminReq && (dataN.exists === false || dataN.pending === true))
    ) {
      throw Error("dummy");
    } else {
      SET_TOKEN(dataN.access_token);
      return {
        type: "LOGIN",
        data: {
          username: is_adminReq ? "Admin" : dataN.user.username,
          name: is_adminReq ? "Admin Hehe" : dataN.user.name,
          is_manager: is_adminReq
            ? false
            : dataN.manager === true
            ? true
            : false,
          is_admin: is_adminReq ? true : dataN.admin === true ? true : false,
        },
      };
    }
  } catch {
    return {
      type: "LOGIN",
      data: INITIAL_VALUE,
    };
  }
};

const LOGOUT = async () => {
  store.dispatch({ type: "RESET_SERVERS" });
  SET_TOKEN("");
  return {
    type: "LOGIN",
    data: INITIAL_VALUE,
  };
};

const IS_TOKEN_VALID = async (token) => {
  try {
    const res = await axios.get("/user/", AUTH_HEADER());
    return {
      status: true,
      data: res.data,
    };
  } catch {
    return {
      status: false,
    };
  }
};

const REGISTER = async (data) => {
  try {
    const res = await axios.post("/register/", {
      name: data.name,
      username: data.username.toLowerCase(),
      password: data.password,
      KEY: "st67hq",
    });
    const dataN = res.data;
    console.log(dataN);

    return {
      error: !dataN.status,
      msg: dataN.msg,
    };
  } catch {
    return {
      error: true,
      msg: "Registration failed",
    };
  }
};

export { LOGIN, IS_TOKEN_VALID, LOGOUT, REGISTER };
