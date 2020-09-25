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
  const { columns, data } = props;
  const defaultItemSize = 35;
  const {
    RenderRow,
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    totalColumnsWidth,
  } = VirtualizedTableFunction(columns, data);

  return (
    <>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={props.height || rows.length * defaultItemSize}
            itemCount={rows.length}
            itemSize={defaultItemSize}
            width={totalColumnsWidth}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </>
  );
};

export default Table;
