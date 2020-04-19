import { combineReducers } from "redux";
import bikeReducer from "./bikeReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
  bikes: bikeReducer,
  user: userReducer
});
export default rootReducer;
