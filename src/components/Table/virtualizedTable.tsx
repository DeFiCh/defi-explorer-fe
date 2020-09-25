import React from "react";
import { useTable, useBlockLayout } from "react-table";

export default function VirtualizedTable(columns, data) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable({ columns, data }, useBlockLayout);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  return {
    RenderRow,
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    totalColumnsWidth,
  };
}
