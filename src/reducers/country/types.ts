import { ASCENDING, DESCENDING } from "../../constants/order";

export interface ICountry {
  [index: string]: string | string[];
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export type HeaderList = {
  [p in keyof ICountry]: string;
};

export type Order = {
  [p in keyof ICountry]: typeof ASCENDING | typeof DESCENDING;
};

export interface ICountryState {
  loading: boolean;
  errorMessage: string | null;
  searchValue: string;
  order: Order;
  countries: ICountry[];
  filteredList: ICountry[];
  headerList: HeaderList;
}
