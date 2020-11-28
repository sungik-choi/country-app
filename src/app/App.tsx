import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { getCountryList } from "../reducers/country/thunk";

import GlobalStyle from "../styles/globalStyle";
import theme from "../styles/theme";

import Header from "../components/header/Header";
import Table from "../components/table/Table";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryList);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Table />
    </ThemeProvider>
  );
};

export default App;
