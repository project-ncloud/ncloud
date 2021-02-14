const INIT = {
  count: 0,
  managers: [],
};

const managerReducer = (state = INIT, action) => {
  switch (action.type) {
    case "STORE_MANAGER":
      return { count: action.data.length, managers: action.data };
    case "TOGGLE_MANAGER":
      let y = state.managers;
      y = y.map((item) => {
        return {
          ...item,
          value:
            action.data.key === item.username ? action.data.val : item.value,
        };
      });
      return { ...state, managers: y };
    default:
      return state;
  }
};

export default managerReducer;
