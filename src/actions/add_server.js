import axios from "axios";
import { AUTH_HEADER } from "./helper";

const add_server = async (block) => {
  try {
    //Data Validations
    if (block.name.trim() === "" || block.address.trim() === "") {
      throw Error("Empty data");
    }

    const res = await axios.post("/server/", block, AUTH_HEADER());

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

export default add_server;
