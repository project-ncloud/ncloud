const INIT = {
  count: 0,
  hostName: "",
  hostPath: "",
  validUsers: [],
};

const validUserReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_VALID_USER":
      return {
        count: action.data.length,
        validUsers: action.data.validUsers,
        hostName: action.data.hostName,
        hostPath: action.data.hostPath,
        userAdmin: action.data.userAdmin,
      };
    case "TOGGLE_VALID_USER":
      let y = state.validUsers;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, validUsers: y };
    case "TOGGLE_SELECTION_MODE_VALID_USER":
      let z = state.validUsers;
      z = z.map((item) => {
        return {
          ...item,
          value:
            action.data === item.username && action.data !== "" ? true : false,
        };
      });
      return { ...state, validUsers: z };

    case "SELECT_VALID_USER":
      let f = state.validUsers;
      f = f.map((item) => {
        return {
          ...item,
          value: action.data.key === item.username ? action.data.val : false,
        };
      });
      return { ...state, validUsers: f };

    case "RESET_VALID_USER_SELECTION":
      let a = state.validUsers;
      a = a.map((item) => {
        return {
          ...item,
          value: false,
        };
      });
      return { ...state, validUsers: a };
    default:
      return state;
  }
};

export default validUserReducer;
