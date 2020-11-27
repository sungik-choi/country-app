import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCountry } from "../../reducers/country";

const AddCountryForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  interface INewCountry {
    name: string;
    alpha2Code: string;
    callingCodes: string;
    capital: string;
    region: string;
  }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" placeholder="나라 이름" ref={register({ required: true })} />
      <input name="alpha2Code" placeholder="2자리 영어코드" ref={register({ required: true })} />
      <input name="callingCodes" placeholder="숫자 코드" ref={register({ required: true })} />
      <input name="capital" placeholder="수도" ref={register({ required: true })} />
      <input name="region" placeholder="대륙" ref={register({ required: true })} />
      <button>나라 추가</button>
    </form>
  );
};

export default AddCountryForm;
