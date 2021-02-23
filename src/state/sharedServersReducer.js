const sharedServersReducer = (state = [], action) => {
  switch (action.type) {
    case "STORE_SHARED_SERVER_DATA":
      return action.data;
    case "REMOVE_SHARED_SERVER":
      const { name, address } = action.data;
      const fState = state.filter((item) => {
        return item.name !== name && item.address !== address;
      });
      return fState;
    case "RESET_SHARED_SERVER":
      return [];
    default:
      return state;
  }
};

export default sharedServersReducer;
