import { combineReducers } from "redux";
import countryReducer from "./country/reducer";

const rootReducer = combineReducers({
  country: countryReducer,
});

export default rootReducer;
