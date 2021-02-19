const INIT = {
  name: "",
  address: "",
  autoStart: false,
};
const serverReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_SERVER":
      return action.data;
    default:
      return INIT;
  }
};

export default serverReducer;
