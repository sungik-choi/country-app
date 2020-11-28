import { getCountryDataRequest, getCountryDataSuccess, getCountryDataFailure } from "./actions";
import { v4 as uuidv4 } from "uuid";
import { ICountryExceptId } from "./types";

export const getCountryList = async (dispatch: any) => {
  dispatch(getCountryDataRequest());
  try {
    const response = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes",
      {
        method: "GET",
      },
    );
    const json = await response.json();
    const data = json.map((eachData: ICountryExceptId) => ({ id: uuidv4(), ...eachData }));

    dispatch(getCountryDataSuccess(data));
  } catch (e) {
    dispatch(getCountryDataFailure(e));
  }
};
