const GET_TOKEN = () => {
  return JSON.parse(localStorage.getItem("NCLOUD_TOKEN"));
};

const SET_TOKEN = (token) => {
  return localStorage.setItem("NCLOUD_TOKEN", JSON.stringify(token));
};

const AUTH_HEADER = (data = {}) => {
  return {
    data: data,
    headers: {
      Authorization: `Bearer ${GET_TOKEN()}`,
    },
  };
};

const TIMEOUT = (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};

export { AUTH_HEADER, GET_TOKEN, SET_TOKEN, TIMEOUT };
