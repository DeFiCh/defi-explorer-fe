import React from "react";
import { I18n } from "react-redux-i18n";
import moment from "moment";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "reactstrap";
import { BLOCK_NUM_PARAM_BASE_PATH } from "../../../../constants";

const getColumns = (props: RouteComponentProps) => {
  const { history } = props;
  const BLOCK_NUM_PARAM = BLOCK_NUM_PARAM_BASE_PATH.slice(0, BLOCK_NUM_PARAM_BASE_PATH.indexOf(':'))
  const column = [
    {
      id: "height",
      Header: I18n.t("containers.homePage.latestBlock.height"),
      accessor: (item) => (
        <>
          <Button color="link" onClick={() => history.push(`${BLOCK_NUM_PARAM}${item.height}`)}>{item.height}</Button>
        </>
      ),
    },
    {
      id: "time",
      Header: I18n.t("containers.homePage.latestBlock.time"),
      accessor: (item) => moment(item.time).fromNow(),
    },
    {
      id: "transactionCount",
      Header: I18n.t("containers.homePage.latestBlock.transactionCount"),
      accessor: "transactionCount",
      className: 'text-center'
    },
    {
      id: "size",
      Header: I18n.t("containers.homePage.latestBlock.size"),
      accessor: "size",
      className: 'text-center'
    },
  ];
  return column;
};

export default getColumns;
