import { ICountryState } from "./types";
import {
  CountryActionTypes,
  ADD_COUNTRY,
  DELETE_COUNTRY,
  SEARCH_COUNTRY,
  SWITCH_ORDER,
  GET_COUNTRY_DATA_REQUEST,
  GET_COUNTRY_DATA_SUCCESS,
  GET_COUNTRY_DATA_FAILURE,
} from "./actions";
import { ASCENDING, DESCENDING } from "../../constants/order";
import { filteredListByKey, sortDescend, sortAscend } from "../../utils/array";

const initialState: ICountryState = {
  loading: true,
  errorMessage: null,
  searchValue: "",
  order: ASCENDING,
  countries: [],
  filteredList: [],
  headerList: ["Name", "Alpha2", "Calling Code", "Capital", "Region", "Delete"],
};

const countryReducer = (state = initialState, action: CountryActionTypes): ICountryState => {
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
