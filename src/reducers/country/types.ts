import { ASCENDING, DESCENDING } from "../../constants/order";

export interface ICountry {
  readonly [index: string]: string | string[];
  readonly name: string;
  readonly alpha2Code: string;
  readonly callingCodes: string[];
  readonly capital: string;
  readonly region: string;
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
