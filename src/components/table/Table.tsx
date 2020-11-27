import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ICountry } from "../../reducers/country";
import TableRow from "./TableRow";

const Table = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.country.loading);
  const headerList = useSelector((state: RootState) => state.country.headerList);
  const searchValue = useSelector((state: RootState) => state.country.searchValue);

  const countries = useSelector((state: RootState) => state.country.countries);
  const filteredList = useSelector((state: RootState) => state.country.filteredList);

  const isSearchValueEmpty = filteredList.length === 0 && searchValue.length === 0;
  const currentList = isSearchValueEmpty ? countries : filteredList;

  const scrollEdgeRef = useRef<HTMLDivElement>(null);
  const displayedList = useInfiniteScroll<ICountry>({ list: currentList, scrollEdgeRef });

  return (
    <main>
      {loading ? (
        <p>loading...</p>
      ) : (
        <table>
          <caption>World Country Information</caption>
          <thead>
            <tr>
              {headerList.map((list) => (
                <th key={list}>{list}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedList.map(({ name, ...data }) => (
              <TableRow key={name} data={{ name, ...data }} />
            ))}
          </tbody>
        </table>
      )}
      <div ref={scrollEdgeRef}></div>
    </main>
  );
};

export default Table;
