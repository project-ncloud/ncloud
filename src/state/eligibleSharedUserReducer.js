const INIT = {
  count: 0,
  users: [],
};

const userReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_ESUSER":
      return { count: action.data.length, users: action.data };
    case "TOGGLE_ESUSER":
      let y = state.users;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, users: y };
    case "RESET_ESUSER":
      return INIT;
    default:
      return state;
  }
};

export default userReducer;
