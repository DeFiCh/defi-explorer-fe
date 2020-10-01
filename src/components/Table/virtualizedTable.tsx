import React from "react";
import { useTable, useBlockLayout, useFlexLayout } from "react-table";

export default function VirtualizedTable(columns, data) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable({ columns, data }, useFlexLayout);

  const RenderRow = React.useCallback(() => {
    return rows.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            console.log(cell);
            return (
              <td {...cell.getCellProps()} className={cell.column.className || ''}>
                {cell.render("Cell")}
              </td>
            );
          })}
        </tr>
      );
    });
  }, [prepareRow, rows]);

  return {
    RenderRow,
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    totalColumnsWidth,
  };
}
