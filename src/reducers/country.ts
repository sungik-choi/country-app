import { ASCENDING, DESCENDING } from "../constants/order";
import createAction from "../utils/createAction";
import { filteredListByKey, sortDescend, sortAscend } from "../utils/array";

export interface ICountry {
  [index: string]: string | string[];
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export interface ICountryState {
  loading: boolean;
  errorMessage: string | null;
  searchValue: string;
  order: typeof ASCENDING | typeof DESCENDING;
  countries: ICountry[];
  filteredList: ICountry[];
  headerList: string[];
}

interface IAddCountryAction {
  type: typeof ADD_COUNTRY;
  payload: ICountry;
}

interface IDeleteCountryAction {
  type: typeof DELETE_COUNTRY;
  payload: string;
}

interface ISearchCountryAction {
  type: typeof SEARCH_COUNTRY;
  payload: string;
}

interface ISwitchOrderAction {
  type: typeof SWITCH_ORDER;
}

interface IGetDataRequest {
  type: typeof GET_COUNTRY_DATA_REQUEST;
}

interface IGetDataSuccess {
  type: typeof GET_COUNTRY_DATA_SUCCESS;
  payload: ICountry[];
}

interface IGetDateFailure {
  type: typeof GET_COUNTRY_DATA_FAILURE;
  payload: string;
}

export type CountryActionTypes =
  | IAddCountryAction
  | IDeleteCountryAction
  | ISearchCountryAction
  | ISwitchOrderAction
  | IGetDataRequest
  | IGetDataSuccess
  | IGetDateFailure;

export const ADD_COUNTRY = "country/ADD_COUNTRY";
export const DELETE_COUNTRY = "country/DELETE_COUNTRY";
export const SEARCH_COUNTRY = "country/SEARCH_COUNTRY";
export const SWITCH_ORDER = "country/SWITCH_ORDER";

export const GET_COUNTRY_DATA_REQUEST = "country/GET_DATA_REQUEST";
export const GET_COUNTRY_DATA_SUCCESS = "country/GET_DATA_SUCCESS";
export const GET_COUNTRY_DATA_FAILURE = "country/GET_DATA_FAILURE";

export const addCountry = createAction(ADD_COUNTRY);
export const deleteCountry = createAction(DELETE_COUNTRY);
export const searchCountry = createAction(SEARCH_COUNTRY);
export const switchOrder = createAction(SWITCH_ORDER);

export const getCountryDataRequest = createAction(GET_COUNTRY_DATA_REQUEST);
export const getCountryDataSuccess = createAction(GET_COUNTRY_DATA_SUCCESS);
export const getCountryDataFailure = createAction(GET_COUNTRY_DATA_FAILURE);

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

const initialState: ICountryState = {
  loading: true,
  errorMessage: null,
  searchValue: "",
  order: ASCENDING,
  countries: [],
  filteredList: [],
  headerList: ["Name", "Alphabet-2", "Calling Code", "Capital", "Region", "Delete"],
};

const countryReducer = (state = initialState, action: CountryActionTypes): ICountryState => {
  console.log(action);
  switch (action.type) {
    case ADD_COUNTRY: {
      const isFiltered = state.searchValue !== "";
      return {
        ...state,
        countries: [action.payload, ...state.countries],
        filteredList: isFiltered ? [action.payload, ...state.filteredList] : [],
      };
    }
    case DELETE_COUNTRY: {
      const isFiltered = state.searchValue !== "";
      return {
        ...state,
        countries: filteredListByKey(state.countries, "name", action.payload),
        filteredList: isFiltered ? filteredListByKey(state.filteredList, "name", action.payload) : [],
      };
    }
    case SEARCH_COUNTRY: {
      const inputValue = action.payload?.trim()?.toLowerCase() || "";
      const isFiltered = inputValue !== "";
      return {
        ...state,
        searchValue: inputValue,
        filteredList: isFiltered
          ? state.countries.filter((country) => country.name.toLowerCase().includes(inputValue))
          : [],
      };
    }
    case SWITCH_ORDER: {
      const isFiltered = state.searchValue !== "";
      return state.order === ASCENDING
        ? {
            ...state,
            order: DESCENDING,
            countries: sortDescend(state.countries, "name"),
            filteredList: isFiltered ? sortDescend(state.filteredList, "name") : [],
          }
        : {
            ...state,
            order: ASCENDING,
            countries: sortAscend(state.countries, "name"),
            filteredList: isFiltered ? sortAscend(state.filteredList, "name") : [],
          };
    }
    case GET_COUNTRY_DATA_REQUEST: {
      return { ...state, loading: true, errorMessage: null };
    }
    case GET_COUNTRY_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        countries: action.payload,
      };
    }
    case GET_COUNTRY_DATA_FAILURE: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    default:
      return state;
  }
};

export default countryReducer;
