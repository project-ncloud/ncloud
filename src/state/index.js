import { combineReducers } from "redux";
import authReducer from "./authActions";
import serversReducer from "./serversReducer";
import serverReducer from "./serverReducer";
import serverAliveReducer from "./serverAliveReducer";
import pendingUserReducer from "./pendingUserReducer";
import userReducer from "./userReducer";
import managerReducer from "./managerReducer";
import uiReducer from "./uiReducer";
import consoleReducer from "./consoleReducer";
import modalReducer from "./modalReducer";

const masterReducer = combineReducers({
  authReducer,
  serverReducer,
  serversReducer,
  serverAliveReducer,
  pendingUserReducer,
  managerReducer,
  userReducer,
  uiReducer,
  consoleReducer,
  modalReducer,
});

export default masterReducer;
