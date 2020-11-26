import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, switchOrder, deleteCountry } from "./reducers/country";
import { RootState } from "./store";

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.country.loading);
  const countries = useSelector((state: RootState) => state.country.countries);
  const headerList = useSelector((state: RootState) => state.country.headerList);

  const sortOrderChange = () => dispatch(switchOrder());
  const deleteList = (name: string) => dispatch(deleteCountry(name));

  useEffect(() => {
    dispatch(getCountryList);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div></div>
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
            {countries.map(({ name, alpha2Code, callingCodes, capital, region }) => (
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
