import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "reactstrap";
import { TRANSACTION_ID_PARAM_BASE_PATH } from "../../../../constants";
import styles from "./LatestTransaction.module.scss";

const getColumns = (props: RouteComponentProps) => {
  const { history } = props;
  const TRANSACTION_ID_PARAM = TRANSACTION_ID_PARAM_BASE_PATH.slice(
    0,
    TRANSACTION_ID_PARAM_BASE_PATH.indexOf(":")
  );
  const column = [
    {
      id: "txid",
      accessor: (item) => (
        <div className={styles.columnEllipsis}>
          <Button
            color="link"
            className='text-normal'
            onClick={() => history.push(`${TRANSACTION_ID_PARAM}${item.txid}`)}
          >
            {item.txid}
          </Button>
        </div>
      ),
      width: 450,
    },
    {
      id: "value",
      accessor: "value",
      className: "text-right",
    },
  ];
  return column;
};

export default getColumns;
