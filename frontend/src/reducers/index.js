import { combineReducers } from "redux";
import players from "./players";
import errors from "./errors";
export default combineReducers({
  players,
  errors
});
