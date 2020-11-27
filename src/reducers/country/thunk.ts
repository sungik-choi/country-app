import { getCountryDataRequest, getCountryDataSuccess, getCountryDataFailure } from "./actions";

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
    dispatch(getCountryDataSuccess(json));
  } catch (e) {
    dispatch(getCountryDataFailure(e));
  }
};
