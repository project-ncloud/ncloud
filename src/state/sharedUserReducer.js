import { get_name } from "../actions/host";

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
    case "POP_SUSER":
      let pop_users = state.users.map((item) => {
        return item.username !== action.data;
      });
      return { count: state.count - 1, users: pop_users };
    case "PUSH_SUSER":
      return {
        count: state.count + 1,
        users: [
          ...state.users,
          { name: get_name(action.data), username: action.data, value: false },
        ],
      };
    case "RESET_SUSER":
      return INIT;
    default:
      return state;
  }
};

export default sharedUserReducer;
