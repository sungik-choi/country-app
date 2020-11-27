import { ASCENDING, DESCENDING } from "../../constants/order";

export interface ICountry {
  [index: string]: string | string[];
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export interface IHeaderList {
  name: string;
  alpha2Code: string;
  callingCodes: string;
  capital: string;
  region: string;
}

export interface IOrder {
  [index: string]: typeof ASCENDING | typeof DESCENDING;
  name: typeof ASCENDING | typeof DESCENDING;
  alpha2Code: typeof ASCENDING | typeof DESCENDING;
  callingCodes: typeof ASCENDING | typeof DESCENDING;
  capital: typeof ASCENDING | typeof DESCENDING;
  region: typeof ASCENDING | typeof DESCENDING;
}

export interface ICountryState {
  loading: boolean;
  errorMessage: string | null;
  searchValue: string;
  order: IOrder;
  countries: ICountry[];
  filteredList: ICountry[];
  headerList: IHeaderList;
}
