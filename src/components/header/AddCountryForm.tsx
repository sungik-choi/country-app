import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { HeaderList } from "../../reducers/country/types";
import { addCountry } from "../../reducers/country/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddCountryForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<HeaderList>();

  const onSubmit: SubmitHandler<HeaderList> = (data: HeaderList, e) => {
    dispatch(
      addCountry({
        ...data,
        id: uuidv4(),
        callingCodes: data.callingCodes.split(","),
      }),
    );
    if (e) e.target.reset();
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
