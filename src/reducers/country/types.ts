import { ASCENDING, DESCENDING } from "../../constants/order";

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
