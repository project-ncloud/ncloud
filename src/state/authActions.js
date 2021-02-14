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
      return {
        name:
          action.data.name === undefined || action.data.name === null
            ? ""
            : action.data.name,
        username:
          action.data.username === undefined || action.data.username === null
            ? ""
            : action.data.username,
        is_admin:
          action.data.admin === undefined || action.data.admin === null
            ? false
            : action.data.admin,
        is_manager:
          action.data.manager === undefined || action.data.manager === null
            ? false
            : action.data.manager,
      };
    default:
      return state;
  }
};

export default authReducer;
