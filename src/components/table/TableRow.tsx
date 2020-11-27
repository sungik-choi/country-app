import React from "react";
import styled from "styled-components";
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
      <AlphaCell>{alpha2Code}</AlphaCell>
      <CallCodeCell>{callingCodes.join(",")}</CallCodeCell>
      <td>{capital}</td>
      <td>{region}</td>
      <DeleteButtonCell>
        <DeleteButton aria-label="나라 삭제" onClick={() => deleteList(name)}>
          <span aria-label="x" role="img">
            ❌
          </span>
        </DeleteButton>
      </DeleteButtonCell>
    </tr>
  );
};

const AlphaCell = styled.td`
  text-align: center;
`;

const CallCodeCell = styled.td`
  text-align: center;
  word-break: break-word;
`;

const DeleteButtonCell = styled.td`
  text-align: center;
`;

const DeleteButton = styled.button``;

export default TableRow;
