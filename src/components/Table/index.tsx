import React from "react";
import VirtualizedTableFunction from "./virtualizedTable";
import { FixedSizeList } from "react-window";

interface TableProps {
  data: any[];
  columns: any[];
  height?: number;
  itemSize?: number;
}

const Table = (props: TableProps) => {
  const { columns, data, height, itemSize } = props;
  const {
    RenderRow,
    getTableBodyProps,
    getTableProps,
    headerGroups,
  } = VirtualizedTableFunction(columns, data);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {RenderRow()}
        </tbody>
      </table>
    </>
  );
};

export default Table;
