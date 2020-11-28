import React from "react";
import styled from "styled-components";
import AddCountryForm from "./AddCountryForm";
import SearchForm from "./SearchForm";

const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <FormWrapper>
        <AddCountryForm />
        <SearchForm />
      </FormWrapper>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  will-change: transform;
  height: ${({ theme }) => theme.size.headerHeight};
  background-color: ${({ theme }) => theme.color.darkGray};
  color: ${({ theme }) => theme.color.white};
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${({ theme }) => theme.size.maxWidth};
  width: ${({ theme }) => theme.size.width};
  margin: 0 auto;
`;

export default Header;
