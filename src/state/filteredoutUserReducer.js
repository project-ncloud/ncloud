const INIT = {
  count: 0,
  users: [],
};

const filteredoutUserReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_FUSER":
      return { count: action.data.length, users: action.data };
    case "TOGGLE_FUSER":
      let y = state.users;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, users: y };
    default:
      return state;
  }
};

export default filteredoutUserReducer;
