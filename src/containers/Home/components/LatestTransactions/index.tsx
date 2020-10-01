import React, { useEffect } from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import { fetchLatestTransactions } from "../../../Websocket/reducer";
import getColumns from "./getColumns";
import Table from "../../../../components/Table";


interface LatestTransactionsComponentProps extends RouteComponentProps {
  transactions: any[];
  fetchLatestTransactions: () => void;
}

const LatestTransactionsComponent: React.FunctionComponent<LatestTransactionsComponentProps> = (
  props: LatestTransactionsComponentProps
) => {
  const { transactions, fetchLatestTransactions } = props;
  useEffect(() => {
    fetchLatestTransactions();
  }, []);
  return (
    <>
      <h1>
        {I18n.t("containers.homePage.latestTransaction.latestTransactionTitle")}
      </h1>
      <div>
        <Table columns={getColumns(props)} data={transactions} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    websocket: {
      transactionResponse: { data },
    },
  } = state;
  return {
    transactions: data,
  };
};

const mapDispatchToProps = {
  fetchLatestTransactions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestTransactionsComponent);
