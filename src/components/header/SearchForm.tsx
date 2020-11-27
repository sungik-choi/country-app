import React from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { switchOrder, searchCountry } from "../../reducers/country";

const DEBOUNCE_DELAY = 500;

const SearchForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const sortOrderChange = () => dispatch(switchOrder());

  const { setState: setInputValue } = useDebounce(dispatch, searchCountry, DEBOUNCE_DELAY);
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <div>
      <input name="search" placeholder="검색어를 입력하세요" type="text" onChange={changeSearchValue} />
      <button onClick={sortOrderChange}>정렬 변경</button>
    </div>
  );
};

export default SearchForm;
