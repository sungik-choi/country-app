import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, switchOrder, deleteCountry, searchCountry, ICountry, addCountry } from "./reducers/country";
import { RootState } from "./store";
import useDebounce from "./hooks/useDebounce";
import { useForm } from "react-hook-form";

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.country.loading);
  const searchValue = useSelector((state: RootState) => state.country.searchValue);
  const countries = useSelector((state: RootState) => state.country.countries);
  const filteredList = useSelector((state: RootState) => state.country.filteredList);
  const headerList = useSelector((state: RootState) => state.country.headerList);
  const { setState: setInputValue } = useDebounce(dispatch, searchCountry, 500);

  const sortOrderChange = () => dispatch(switchOrder());
  const deleteList = (name: string) => dispatch(deleteCountry(name));
  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const isSearchValueEmpty = filteredList.length === 0 && searchValue.length === 0;
  const displayedList = isSearchValueEmpty ? countries : filteredList;

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: ICountry, e: any) => {
    dispatch(addCountry(data));
    e.target.reset();
  };

  useEffect(() => {
    dispatch(getCountryList);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" placeholder="나라 이름" ref={register({ required: true })} />
            <input name="alpha2Code" placeholder="2자리 영어코드" ref={register({ required: true })} />
            <input name="callingCodes" placeholder="숫자 코드" ref={register({ required: true })} />
            <input name="capital" placeholder="수도" ref={register({ required: true })} />
            <input name="region" placeholder="대륙" ref={register({ required: true })} />
            {/* {errors.exampleRequired && <span>This field is required</span>} */}
            <button>나라 세우기</button>
          </form>
          <div>
            <input name="search" placeholder="검색어를 입력하세요" type="text" onChange={changeSearchValue} />
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
