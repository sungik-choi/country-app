import React from "react";
import { ICountry, deleteCountry } from "../../reducers/country";
import { useDispatch } from "react-redux";

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
