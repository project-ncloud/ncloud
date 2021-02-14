const INIT = {
  show_addServer: false,
  show_createHost: false,
  show_pendingUsersList: false,
  show_usersList: false,
  show_managersList: false,
  show_createManager: false,
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
    case "TOGGLE_SHOW_MANAGERS":
      return { ...state, show_managersList: action.data };
    case "TOGGLE_CREATE_MANAGER":
      return { ...state, show_createManager: action.data };
    default:
      return state;
  }
};

export default modalReducer;
