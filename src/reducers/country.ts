import { Action } from "redux";
import { ASCENDING, DESCENDING } from "../constants/order";
import createAction from "../utils/createAction";
import { ThunkDispatch } from "redux-thunk";

export interface ICountry {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export interface ICountryState {
  loading: boolean;
  errorMessage: string | null;
  searchWord: string;
  order: typeof ASCENDING | typeof DESCENDING;
  countries: ICountry[];
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
  searchWord: "",
  order: ASCENDING,
  countries: [],
};

const countryReducer = (state = initialState, action: CountryActionTypes): ICountryState => {
  console.log(action);
  switch (action.type) {
    case ADD_COUNTRY: {
      return { ...state, countries: [...state.countries, action.payload] };
    }
    case DELETE_COUNTRY: {
      return { ...state, countries: state.countries.filter((country) => country.name !== action.payload) };
    }
    case SEARCH_COUNTRY: {
      return {
        ...state,
        countries: state.countries.filter((country) =>
          country.name.toUpperCase().includes(action.payload.toUpperCase()),
        ),
      };
    }
    case SWITCH_ORDER: {
      return { ...state, order: state.order === ASCENDING ? DESCENDING : ASCENDING };
    }
    case GET_COUNTRY_DATA_REQUEST: {
      return { ...state, loading: true, errorMessage: null };
    }
    case GET_COUNTRY_DATA_SUCCESS: {
      return { ...state, countries: action.payload, loading: false, errorMessage: null };
    }
    case GET_COUNTRY_DATA_FAILURE: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    default:
      return state;
  }
};

export default countryReducer;
