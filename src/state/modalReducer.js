const INIT = {
  show_addServer: false,
  show_createHost: false,
  show_pendingUsersList: false,
  show_usersList: false,
};

const modalReducer = (state = INIT, action) => {
  switch (action.type) {
    case "TOGGLE_ADD_SERVER":
      return { ...state, show_addServer: action.data };
    case "TOGGLE_CREATE_HOST":
      return { ...state, show_createHost: action.data };
    case "TOGGLE_SHOW_PENDING_USERS":
      return { ...state, show_pendingUsersList: action.data };
    case "TOGGLE_SHOW_USERS":
      return { ...state, show_usersList: action.data };
    default:
      return state;
  }
};

export default modalReducer;
