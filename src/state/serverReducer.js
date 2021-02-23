const INIT = {
  name: "",
  address: "",
  autoStart: false,
};
const serverReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_SERVER":
      return action.data;
    case "RESET_SERVER":
      return INIT;
    default:
      return state;
  }
};

export default serverReducer;
