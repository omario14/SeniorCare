import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import senior from "./senior";

export default combineReducers({
  auth,
  message,
  senior,
});
