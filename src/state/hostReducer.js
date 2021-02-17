const hostReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_HOST":
      return action.data;
    default:
      return state;
  }
};

export default hostReducer;
