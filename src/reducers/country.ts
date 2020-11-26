import axios from "axios";

export interface ICountry {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export const ASCENDING = "ASCENDING";
export const DESCENDING = "DESCENDING";

export interface ICountryState {
  loading: boolean;
  errorMessage: string | null;
  searchWord: string;
  order: typeof ASCENDING | typeof DESCENDING;
  countries: ICountry[];
}

export const GET_COUNTRY_DATA = "country/GET_DATA";
export const GET_COUNTRY_DATA_SUCCESS = "country/GET_DATA_SUCCESS";
export const GET_COUNTRY_DATA_ERROR = "country/GET_DATA_ERROR";

export const ADD_COUNTRY = "country/ADD_COUNTRY";
export const DELETE_COUNTRY = "country/DELETE_COUNTRY";
export const SEARCH_COUNTRY = "country/SEARCH_COUNTRY";
export const SWITCH_ORDER = "country/SWITCH_ORDER";

interface IAddCountryAction {
  type: typeof ADD_COUNTRY;
  payload: ICountry;
}

interface IDeleteCountryAction {
  type: typeof DELETE_COUNTRY;
  payload: string;
}

export type CountryActionTypes = IAddCountryAction | IDeleteCountryAction;

export const addCountry = (countryData: ICountry): CountryActionTypes => ({
  type: ADD_COUNTRY,
  payload: countryData,
});

export const deleteCountry = (name: string): IDeleteCountryAction => ({
  type: DELETE_COUNTRY,
  payload: name,
});

export const searchCountry = (word: string) => ({
  type: SEARCH_COUNTRY,
  payload: word,
});

const initialState: ICountryState = {
  loading: true,
  errorMessage: null,
  searchWord: "",
  order: "ASCENDING",
  countries: [],
};

const countryReducer = (state = initialState, action: any): ICountryState => {
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
    default:
      return state;
  }
};

export const getCountryList = async (): Promise<ICountry> => {
  const response = await axios.get<ICountry>(
    "https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes",
  );
  return response.data;
};

export default countryReducer;
