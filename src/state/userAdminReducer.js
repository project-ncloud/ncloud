const INIT = {
  name: "",
  writable: false,
  sharedUsers: [],
};

const userAdminReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_USER_ADMIN":
      return action.data;
    default:
      return state;
  }
};

export default userAdminReducer;
