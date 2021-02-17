const INITIAL_VALUE = {
  username: "",
  name: "",
  is_manager: null,
  is_admin: null,
};

const authReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "REFRESH_AUTH":
      if (action.data === undefined || action.data === null) {
        return INITIAL_VALUE;
      }
      return {
        name: action.data.name,
        username: action.data.username,
        is_admin: action.data.admin,
        is_manager: action.data.manager,
      };
    default:
      return state;
  }
};

export default authReducer;
