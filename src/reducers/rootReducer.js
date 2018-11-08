import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr'

import user from "./user";
import player from "./player";
import team from "./team";
import field from "./field";
import fielditem from "./field-item";
import scheduling from "./scheduling";
import championship from "./championship";
import person from "./person";

export default combineReducers({
  user,
  player,
  team,
  field,
  fielditem,
  scheduling,
  championship,
  person,
  toastr: toastrReducer
});