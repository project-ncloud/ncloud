const INIT = {
  name: "",
  path: "",
  address: "",
};

const explorerControlReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_EXPLORER_CONSTANT":
      return action.data;
    default:
      return state;
  }
};
export default explorerControlReducer;
