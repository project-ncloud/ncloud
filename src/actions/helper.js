import querystring from "querystring";
const GET_TOKEN = () => {
  return JSON.parse(localStorage.getItem("NCLOUD_TOKEN"));
};

const SET_TOKEN = (token) => {
  return localStorage.setItem("NCLOUD_TOKEN", JSON.stringify(token));
};

const GET_ACCESS = () => {
  return JSON.parse(localStorage.getItem("NCLOUD_NODE_ACCESS"));
};

const SET_ACCESS = (token) => {
  return localStorage.setItem("NCLOUD_NODE_ACCESS", JSON.stringify(token));
};

const AUTH_HEADER = (data = {}) => {
  return {
    data: data,
    headers: {
      Authorization: `Bearer ${GET_TOKEN()}`,
    },
  };
};

const GET_AUTH_HEADER = (params = null) => {
  return {
    headers: {
      Authorization: `Bearer ${GET_TOKEN()}`,
    },
    params,
  };
};

const GET_QUERY = (block) => {
  return querystring.stringify(block);
};

const TIMEOUT = (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};

export {
  AUTH_HEADER,
  GET_AUTH_HEADER,
  GET_TOKEN,
  SET_TOKEN,
  GET_ACCESS,
  SET_ACCESS,
  GET_QUERY,
  TIMEOUT,
};
