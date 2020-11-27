import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TableHead = (): JSX.Element => {
  const headerList = useSelector((state: RootState) => state.country.headerList);

  return (
    <thead>
      <tr>
        {headerList.map((list) => (
          <th key={list}>{list}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
