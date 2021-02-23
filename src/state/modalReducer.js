const INIT = {
  show_addServer: false,
  show_createHost: false,
  show_pendingUsersList: false,
  show_usersList: false,
  show_managersList: false,
  show_createManager: false,

  show_validUsersList: false,
  show_addValidUser: false,
  show_addUserAdmin: false,

  show_ncloud_preferences: false,
  show_server_preferences: false,
  show_host_preferences: false,

  show_about: false,
  show_video_modal: false,
};

const modalReducer = (state = INIT, action) => {
  switch (action.type) {
    //Main
    case "TOGGLE_ADD_SERVER":
      return { ...state, show_addServer: action.data };
    case "TOGGLE_CREATE_HOST":
      return { ...state, show_createHost: action.data };

    //User system and role
    case "TOGGLE_SHOW_PENDING_USERS":
      return { ...state, show_pendingUsersList: action.data };
    case "TOGGLE_SHOW_USERS":
      return { ...state, show_usersList: action.data };
    case "TOGGLE_SHOW_MANAGERS":
      return { ...state, show_managersList: action.data };
    case "TOGGLE_CREATE_MANAGER":
      return { ...state, show_createManager: action.data };

    //Valid user adn user admin
    case "TOGGLE_SHOW_VALID_USERS":
      return { ...state, show_validUsersList: action.data };
    case "TOGGLE_ADD_VALID_USERS":
      return { ...state, show_addValidUser: action.data };
    case "TOGGLE_ADD_USER_ADMIN":
      return { ...state, show_addUserAdmin: action.data };

    //Preferences
    case "TOGGLE_NCLOUD_PREFERENCES":
      return { ...state, show_ncloud_preferences: action.data };
    case "TOGGLE_SERVER_PREFERENCES":
      return { ...state, show_server_preferences: action.data };
    case "TOGGLE_HOST_PREFERENCES":
      return { ...state, show_host_preferences: action.data };
    // About
    case "TOGGLE_SHOW_ABOUT":
      return { ...state, show_about: action.data };

    case "TOGGLE_VIDEO_MODAL":
      return { ...state, show_video_modal: !state.show_video_modal };

    case "RESET_MODAL_DATA":
      return INIT;
    default:
      return state;
  }
};

export default modalReducer;
