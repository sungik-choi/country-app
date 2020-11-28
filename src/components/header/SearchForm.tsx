import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { searchCountry } from "../../reducers/country/actions";
import useDebounce from "../../hooks/useDebounce";

const DEBOUNCE_DELAY = 500;

const SearchForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { setState: setInputValue } = useDebounce(dispatch, searchCountry, DEBOUNCE_DELAY);
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <SearchFormWrap>
      <SearchInput
        type="text"
        name="search"
        aria-label="나라 검색"
        placeholder="검색어를 입력하세요"
        onChange={changeSearchValue}
      />
    </SearchFormWrap>
  );
};

const SearchFormWrap = styled.div`
  margin-top: ${({ theme }) => theme.size.md};
`;

const SearchInput = styled.input`
  width: ${({ theme }) => theme.size.searchInputWidth};
  margin: ${({ theme }) => theme.size.sm} 0;
  padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
`;

export default SearchForm;
