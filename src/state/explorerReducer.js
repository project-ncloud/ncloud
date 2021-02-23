const INIT = {
  data: [],
  path: "",
};

const explorerReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_EXPLORER_DATA":
      return action.data;
    case "STORE_EXPLORER_PATH":
      return { ...state, path: action.data };
    case "RESET_EXPLORER_DATA":
      return INIT;
    default:
      return state;
  }
};

export default explorerReducer;
