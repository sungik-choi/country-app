import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, switchOrder, deleteCountry, searchCountry } from "./reducers/country";
import { RootState } from "./store";

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.country.loading);
  const searchValue = useSelector((state: RootState) => state.country.searchValue);
  const countries = useSelector((state: RootState) => state.country.countries);
  const filteredList = useSelector((state: RootState) => state.country.filteredList);
  const headerList = useSelector((state: RootState) => state.country.headerList);

  const sortOrderChange = () => dispatch(switchOrder());
  const deleteList = (name: string) => dispatch(deleteCountry(name));
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(searchCountry(e.target.value));

  const isSearchValueEmpty = filteredList.length === 0 && searchValue.length === 0;
  const displayedList = isSearchValueEmpty ? countries : filteredList;

  useEffect(() => {
    dispatch(getCountryList);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div>
            <input name="search" type="text" onChange={(e) => changeSearchValue(e)} />
          </div>
          <button onClick={sortOrderChange}>정렬 변경</button>
          <table>
            <caption>World Country Information</caption>
            <thead>
              <tr>
                {headerList.map((list) => (
                  <th key={list}>{list}</th>
                ))}
              </tr>
            </thead>
            {displayedList.map(({ name, alpha2Code, callingCodes, capital, region }) => (
              <tbody key={name}>
                <tr>
                  <td>{name}</td>
                  <td>{alpha2Code}</td>
                  <td>{[...callingCodes]}</td>
                  <td>{capital}</td>
                  <td>{region}</td>
                  <td>
                    <button onClick={() => deleteList(name)}>삭제</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
    </>
  );
};

export default App;
