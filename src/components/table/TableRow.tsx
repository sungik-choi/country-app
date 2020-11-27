import React from "react";
import { useDispatch } from "react-redux";
import { ICountry } from "../../reducers/country/types";
import { deleteCountry } from "../../reducers/country/actions";

interface IProps {
  data: ICountry;
}

const TableRow = ({ data }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const { name, alpha2Code, callingCodes, capital, region }: ICountry = data;
  const deleteList = (name: string) => dispatch(deleteCountry(name));

  return (
    <tr>
      <td>{name}</td>
      <td>{alpha2Code}</td>
      <td>{callingCodes.join(",")}</td>
      <td>{capital}</td>
      <td>{region}</td>
      <td>
        <button onClick={() => deleteList(name)}>삭제</button>
      </td>
    </tr>
  );
};

export default TableRow;
