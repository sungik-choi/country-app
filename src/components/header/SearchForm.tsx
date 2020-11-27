import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { switchOrder, searchCountry } from "../../reducers/country/actions";

import useDebounce from "../../hooks/useDebounce";

const DEBOUNCE_DELAY = 500;

const SearchForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const sortOrderChange = () => dispatch(switchOrder());

  const { setState: setInputValue } = useDebounce(dispatch, searchCountry, DEBOUNCE_DELAY);
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div>
      <SearchInput
        type="text"
        name="search"
        aria-label="나라 검색"
        placeholder="검색어를 입력하세요"
        onChange={changeSearchValue}
      />
      <SortButton type="button" aria-label="정렬 순서 변경" onClick={sortOrderChange}>
        정렬 순서 변경
      </SortButton>
    </div>
  );
};

const SearchInput = styled.input`
  width: ${({ theme }) => theme.searchInputWidth};
  margin: ${({ theme }) => theme.size.sm} 0;
  padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
`;

const SortButton = styled.button`
  margin-left: ${({ theme }) => theme.size.md};
  padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
`;

export default SearchForm;
