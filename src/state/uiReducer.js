const INIT = [
  {
    name: "showDashboard",
    value: true,
  },
  {
    name: "showServerContainer",
    value: false,
  },
];

// eslint-disable-next-line no-unused-vars
const uiReducer = (state = INIT, action) => {
  switch (action.type) {
    case "TOGGLE_UI":
      // eslint-disable-next-line array-callback-return
      const fState = state.map((item) => {
        item.value = item.name === action.data ? true : false;
        return item;
      });
      return fState;
    case "RESET_UI":
      return INIT;
    default:
      return state;
  }
};

export default uiReducer;
