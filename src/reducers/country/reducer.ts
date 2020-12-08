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
import { filteredListByKey, sortDescend, sortAscend } from "../../utils/utils";

const initialState: ICountryState = {
  loading: true,
  errorMessage: null,
  searchValue: "",
  order: {
    name: ASCENDING,
    alpha2Code: ASCENDING,
    callingCodes: ASCENDING,
    capital: ASCENDING,
    region: ASCENDING,
  },
  countries: [],
  filteredList: [],
  headerList: {
    name: "나라명",
    alpha2Code: "alpha-2",
    callingCodes: "숫자코드",
    capital: "수도",
    region: "대륙",
  },
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
        countries: filteredListByKey(state.countries, "id", action.payload),
        filteredList: isFiltered ? filteredListByKey(state.filteredList, "id", action.payload) : [],
      };
    }

    case SEARCH_COUNTRY: {
      const inputValue = action.payload.trim().toLowerCase() || "";
      const isFiltered = inputValue !== "";
      return {
        ...state,
        searchValue: inputValue,
        filteredList: isFiltered
          ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
            state.countries.filter(({ id, ...country }) =>
              Object.values(country).some((value: string | string[]) => {
                if (typeof value !== "string") value = value.join("");
                return value.toLowerCase().includes(inputValue);
              }),
            )
          : [],
      };
    }

    case SWITCH_ORDER: {
      const isFiltered = state.searchValue !== "";
      return state.order[action.payload] === ASCENDING
        ? {
            ...state,
            order: { ...state.order, [action.payload]: DESCENDING },
            countries: sortDescend(state.countries, action.payload),
            filteredList: isFiltered ? sortDescend(state.filteredList, action.payload) : [],
          }
        : {
            ...state,
            order: { ...state.order, [action.payload]: ASCENDING },
            countries: sortAscend(state.countries, action.payload),
            filteredList: isFiltered ? sortAscend(state.filteredList, action.payload) : [],
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
