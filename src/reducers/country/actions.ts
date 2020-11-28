import { ICountry, Order } from "./types";

export const ADD_COUNTRY = "country/ADD_COUNTRY";
export const DELETE_COUNTRY = "country/DELETE_COUNTRY";
export const SEARCH_COUNTRY = "country/SEARCH_COUNTRY";
export const SWITCH_ORDER = "country/SWITCH_ORDER";

export const GET_COUNTRY_DATA_REQUEST = "country/GET_DATA_REQUEST";
export const GET_COUNTRY_DATA_SUCCESS = "country/GET_DATA_SUCCESS";
export const GET_COUNTRY_DATA_FAILURE = "country/GET_DATA_FAILURE";

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
  payload: keyof Order;
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

export const addCountry = (country: ICountry): IAddCountryAction => ({
  type: ADD_COUNTRY,
  payload: country,
});

export const deleteCountry = (name: string): IDeleteCountryAction => ({
  type: DELETE_COUNTRY,
  payload: name,
});

export const searchCountry = (value: string): ISearchCountryAction => ({
  type: SEARCH_COUNTRY,
  payload: value,
});

export const switchOrder = (key: keyof Order): ISwitchOrderAction => ({
  type: SWITCH_ORDER,
  payload: key,
});

export const getCountryDataRequest = (): IGetDataRequest => ({
  type: GET_COUNTRY_DATA_REQUEST,
});

export const getCountryDataSuccess = (res: ICountry[]): IGetDataSuccess => ({
  type: GET_COUNTRY_DATA_SUCCESS,
  payload: res,
});

export const getCountryDataFailure = (err: string): IGetDateFailure => ({
  type: GET_COUNTRY_DATA_FAILURE,
  payload: err,
});
