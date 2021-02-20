const INIT = {
  name: "",
  path: "",
  public: false,
  writable: false,
};

const hostReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_HOST":
      return action.data;
    default:
      return state;
  }
};

export default hostReducer;
