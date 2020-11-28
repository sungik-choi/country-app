import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { switchOrder } from "../../reducers/country/actions";

const TableHead = (): JSX.Element => {
  const dispatch = useDispatch();
  const sortOrderChange = (key: string) => dispatch(switchOrder(key));

  const headerList = useSelector((state: RootState) => state.country.headerList);
  const order = useSelector((state: RootState) => state.country.order);

  return (
    <StyledTableHead>
      <tr>
        {Object.entries(headerList).map(([key, value]) => (
          <th key={key} aria-sort={order[key]}>
            <span>{value}</span>
            <SortButton aria-label="정렬" onClick={() => sortOrderChange(key)}>
              정렬
            </SortButton>
          </th>
        ))}
        <th>
          <span>삭제</span>
        </th>
      </tr>
    </StyledTableHead>
  );
};

const SortButton = styled.button`
  margin-left: ${({ theme }) => theme.size.sm};
`;

const StyledTableHead = styled.thead``;

export default TableHead;
