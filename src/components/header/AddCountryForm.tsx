import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addCountry } from "../../reducers/country/actions";

import { useForm } from "react-hook-form";
interface INewCountry {
  name: string;
  alpha2Code: string;
  callingCodes: string;
  capital: string;
  region: string;
}

const AddCountryForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: INewCountry, e: any) => {
    dispatch(
      addCountry({
        ...data,
        callingCodes: data.callingCodes.split(","),
      }),
    );
    e.target.reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <StyledLegend>나라 추가하기</StyledLegend>
        <input name="name" aria-label="나라 이름" placeholder="나라 이름" ref={register({ required: true })} />
        <input
          name="alpha2Code"
          aria-label="2자리 영어코드"
          placeholder="2자리 영어코드"
          ref={register({ required: true })}
        />
        <input name="callingCodes" aria-label="숫자 코드" placeholder="숫자 코드" ref={register({ required: true })} />
        <input name="capital" aria-label="수도" placeholder="수도" ref={register({ required: true })} />
        <input name="region" aria-label="대륙" placeholder="대륙" ref={register({ required: true })} />
        <AddCountryButton aria-label="나라 추가">나라 추가</AddCountryButton>
      </fieldset>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  input {
    width: ${({ theme }) => theme.size.inputWidth};
    padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
    margin-right: ${({ theme }) => theme.size.sm};
  }
`;

const StyledLegend = styled.legend`
  margin-bottom: ${({ theme }) => theme.size.sm};
`;

const AddCountryButton = styled.button`
  padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.md};
`;

export default AddCountryForm;
