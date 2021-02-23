const INIT = {
  count: 0,
  users: [],
};

const sharedUserReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_SUSER":
      return { count: action.data.length, users: action.data };
    case "TOGGLE_SUSER":
      let y = state.users;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, users: y };
    case "RESET_SUSER":
      return INIT;
    default:
      return state;
  }
};

export default sharedUserReducer;
