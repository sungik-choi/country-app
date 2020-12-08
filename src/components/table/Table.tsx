import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Table = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.country.loading);
  const errorMessage = useSelector((state: RootState) => state.country.errorMessage);
  const countryList = useSelector((state: RootState) => {
    const { searchValue, countries, filteredList } = state.country;
    const isSearchValueEmpty = filteredList.length === 0 && searchValue.length === 0;
    return isSearchValueEmpty ? countries : filteredList;
  });

  const scrollEdgeRef = useRef<HTMLDivElement>(null);
  const displayedList = useInfiniteScroll({ list: countryList, scrollEdgeRef });

  return (
    <Main>
      {errorMessage && <p>{errorMessage}</p>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <StyledTable>
          <caption className="visually-hidden">나라 정보</caption>
          <TableHead />
          <tbody>
            {displayedList.map((data) => (
              <TableRow key={data.id} data={data} />
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
