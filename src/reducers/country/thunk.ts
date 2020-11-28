import { getCountryDataRequest, getCountryDataSuccess, getCountryDataFailure } from "./actions";
import { v4 as uuidv4 } from "uuid";
import { ICountryExceptId } from "./types";
import { AnyAction, Dispatch } from "redux";

export const getCountryList = async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  dispatch(getCountryDataRequest());
  try {
    const response = await fetch(process.env.API_URL);
    const json = await response.json();
    const data = json.map((eachData: ICountryExceptId) => ({ id: uuidv4(), ...eachData }));

    dispatch(getCountryDataSuccess(data));
  } catch (e) {
    dispatch(getCountryDataFailure(e));
  }
};
