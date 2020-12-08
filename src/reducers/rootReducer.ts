import { combineReducers } from "redux";
import countryReducer from "../reducers/country/reducer";

const rootReducer = combineReducers({
  country: countryReducer,
});

export default rootReducer;
