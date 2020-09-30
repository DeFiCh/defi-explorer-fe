import React from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "reactstrap";

interface LatestTransactionsComponentProps extends RouteComponentProps {
  transactions: any[];
}

const LatestTransactionsComponent: React.FunctionComponent<LatestTransactionsComponentProps> = (
  props: LatestTransactionsComponentProps
) => {
  const { transactions } = props;
  return (
    <>
      <h1>
        {I18n.t("containers.homePage.latestTransaction.latestTransactionTitle")}
      </h1>
      <div>
        {transactions.map((item, id) => (
          <Row key={id}>
            <Col xs={9}>{item.txid}</Col>
            <Col xs={3}>{item.value}</Col>
          </Row>
        ))}
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

export default connect(mapStateToProps)(LatestTransactionsComponent);
