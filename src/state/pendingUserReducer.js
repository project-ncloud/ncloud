const INIT = {
  count: 0,
  pending_users: [],
};

const pendingUserReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_PENDING_USER":
      return { count: action.data.length, pending_users: action.data };
    case "REMOVE_PENDING_USER":
      let x = state;
      console.log(x);
      const pos = x.indexOf(action.data);
      console.log(pos);
      x.pop(pos);
      console.log(x);
      return x;

    case "TOGGLE_PENDING_USER":
      let y = state.pending_users;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, pending_users: y };
    case "RESET_PENDING_USER":
      return INIT;
    default:
      return state;
  }
};

export default pendingUserReducer;
