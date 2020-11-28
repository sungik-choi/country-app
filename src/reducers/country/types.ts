import { ASCENDING, DESCENDING } from "../../constants/order";

export interface ICountry {
  id: string;
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

export type ICountryExceptId = Omit<ICountry, "id">;

export type HeaderList = {
  [p in keyof ICountryExceptId]: string;
};

export type Order = {
  [p in keyof ICountryExceptId]: typeof ASCENDING | typeof DESCENDING;
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
