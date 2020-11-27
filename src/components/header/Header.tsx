import React from "react";
import AddCountryForm from "./AddCountryForm";
import SearchForm from "./SearchForm";

const Header = (): JSX.Element => {
  return (
    <header>
      <AddCountryForm />
      <SearchForm />
    </header>
  );
};

export default Header;
