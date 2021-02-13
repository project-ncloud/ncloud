const serversReducer = (state = [], action) => {
  switch (action.type) {
    case "STORE_SERVER_DATA":
      return action.data;
    case "REMOVE_SERVER":
      const { name, address } = action.data;
      const fState = state.filter((item) => {
        return item.name !== name && item.address !== address;
      });
      return fState;
    default:
      return state;
  }
};

export default serversReducer;
