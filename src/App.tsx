import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, switchOrder } from "./reducers/country";
import { RootState } from "./store";

const headerList = ["이", "Alphabet-2", "Calling Code", "Capital", "Region"];

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.country.loading);
  const countries = useSelector((state: RootState) => state.country.countries);

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
          <button onClick={() => dispatch(switchOrder())}>정렬 변경</button>
          <table>
            <caption>World Country Information</caption>
            <thead>
              {headerList.map((list) => (
                <th>{list}</th>
              ))}
            </thead>
            {countries.map(({ name, alpha2Code, callingCodes, capital, region }) => (
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>{alpha2Code}</td>
                  <td>{[...callingCodes]}</td>
                  <td>{capital}</td>
                  <td>{region}</td>
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
