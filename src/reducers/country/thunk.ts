import { getCountryDataRequest, getCountryDataSuccess, getCountryDataFailure } from "./actions";
import { AnyAction, Dispatch } from "redux";
import { ICountry, ICountryExceptId } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getCountryList = async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  dispatch(getCountryDataRequest());
  try {
    const response = await fetch(process.env.API_URL);
    const json: ICountryExceptId[] = await response.json();
    const data: ICountry[] = json.map((eachData) => ({ id: uuidv4(), ...eachData }));

    dispatch(getCountryDataSuccess(data));
  } catch (e) {
    dispatch(getCountryDataFailure(e));
  }
};
