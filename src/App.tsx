import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountryList } from "./reducers/country";
import Header from "./components/header/Header";
import Table from "./components/table/Table";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryList);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Table />
    </>
  );
};

export default App;
