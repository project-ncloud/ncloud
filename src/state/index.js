import { combineReducers } from "redux";
import authReducer from "./authActions";
import serversReducer from "./serversReducer";
import sharedServersReducer from "./sharedServersReducer";
import serverReducer from "./serverReducer";
import serverAliveReducer from "./serverAliveReducer";
import hostReducer from "./hostReducer";
import pendingUserReducer from "./pendingUserReducer";
import userReducer from "./userReducer";
import filteredoutUserReducer from "./filteredoutUserReducer";
import validUserReducer from "./validUserReducer";
import userAdminReducer from "./userAdminReducer";
import managerReducer from "./managerReducer";
import uiReducer from "./uiReducer";
import consoleReducer from "./consoleReducer";
import modalReducer from "./modalReducer";
import explorerReducer from "./explorerReducer";
import explorerControlReducer from "./explorerControlReducer";

const masterReducer = combineReducers({
  authReducer,
  serverReducer,
  serversReducer,
  sharedServersReducer,
  serverAliveReducer,
  hostReducer,
  pendingUserReducer,
  managerReducer,
  userReducer,
  filteredoutUserReducer,
  validUserReducer,
  userAdminReducer,
  uiReducer,
  consoleReducer,
  modalReducer,
  explorerReducer,
  explorerControlReducer,
});

export default masterReducer;
