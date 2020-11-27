import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICountry } from "../../reducers/country/types";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Table = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.country.loading);
  const searchValue = useSelector((state: RootState) => state.country.searchValue);

  const countries = useSelector((state: RootState) => state.country.countries);
  const filteredList = useSelector((state: RootState) => state.country.filteredList);

  // const isSearchResultEmpty = filteredList.length === 0 && searchValue.length > 0;
  const isSearchValueEmpty = filteredList.length === 0 && searchValue.length === 0;
  const currentList = isSearchValueEmpty ? countries : filteredList;

  const scrollEdgeRef = useRef<HTMLDivElement>(null);
  const displayedList = useInfiniteScroll<ICountry>({ list: currentList, scrollEdgeRef });

  return (
    <Main>
      {loading ? (
        <p>loading...</p>
      ) : (
        <StyledTable>
          <StyledCaption>나라 정보</StyledCaption>
          <TableHead />
          <tbody>
            {displayedList.map(({ name, ...data }) => (
              <TableRow key={name} data={{ name, ...data }} />
            ))}
          </tbody>
        </StyledTable>
      )}
      <div ref={scrollEdgeRef}></div>
    </Main>
  );
};

const Main = styled.main`
  max-width: ${({ theme }) => theme.size.maxWidth};
  width: ${({ theme }) => theme.size.width};
  margin: 0 auto;
`;

const StyledCaption = styled.caption`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.size.md};
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  word-break: break-all;
  border-radius: ${({ theme }) => theme.size.sm};
  border: 2px solid ${({ theme }) => theme.color.white2};
  margin-top: ${({ theme }) => theme.size.lg};
  margin-bottom: ${({ theme }) => theme.size.xl};

  th,
  td {
    vertical-align: middle;
  }

  tr {
    border-bottom: 1px solid ${({ theme }) => theme.color.white2};
  }

  td {
    padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
  }

  th {
    font-weight: bold;
    padding: ${({ theme }) => theme.size.md} 0;
  }
`;

export default Table;
