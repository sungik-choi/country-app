import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TableHead = (): JSX.Element => {
  const headerList = useSelector((state: RootState) => state.country.headerList);

  return (
    <StyledTableHead>
      <tr>
        {headerList.map((list) => (
          <th key={list}>{list}</th>
        ))}
      </tr>
    </StyledTableHead>
  );
};

const StyledTableHead = styled.thead`
  th:nth-child(1) {
    width: ${({ theme }) => theme.size.nameCell};
  }
  th:nth-child(2) {
    width: ${({ theme }) => theme.size.alphaCell};
  }
  th:nth-child(3) {
    width: ${({ theme }) => theme.size.callingCodeCell};
  }
  th:nth-child(4) {
    width: ${({ theme }) => theme.size.capitalCell};
  }
  th:nth-child(5) {
    width: ${({ theme }) => theme.size.regionCell};
  }
  th:nth-child(6) {
    width: ${({ theme }) => theme.size.deleteButtonCell};
  }
`;

export default TableHead;
