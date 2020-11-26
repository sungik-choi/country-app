import { combineReducers } from "redux";
import countryReducer from "./reducers/country";

const rootReducer = combineReducers({
  country: countryReducer,
});

export default rootReducer;
