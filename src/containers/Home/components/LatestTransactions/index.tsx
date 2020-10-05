import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, Table, Row, Col, Button } from "reactstrap";
import { TRANSACTION_BASE_PATH } from "../../../../constants";
import { fetchLatestTransactions } from "../../../Websocket/reducer";
import styles from "../../Home.module.scss";

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

  const loadRows = useCallback(() => {
    return transactions.map((item) => (
      <tr key={item.txid}>
        <td>
          <Link to={`${TRANSACTION_BASE_PATH}/${item.txid}`}>{item.txid}</Link>
        </td>
        <td>
          <div className="float-right">{item.value}</div>
        </td>
      </tr>
    ));
  }, [transactions]);

  return (
    <>
      <h1>
        <Row>
          <Col xs="10">
            {I18n.t(
              "containers.homePage.latestTransaction.latestTransactionTitle"
            )}
          </Col>
          <Col xs="2">
            <Button
              color="link"
              className='float-right'
              onClick={() => props.history.push(TRANSACTION_BASE_PATH)}
            >
              {I18n.t("containers.homePage.viewAll")}
            </Button>
          </Col>
        </Row>
      </h1>
      <div>
        <Card className={styles.card}>
          <div className={`${styles.tableResponsive} table-responsive-xl`}>
            <Table className={styles.table}>
              <tbody>{loadRows()}</tbody>
            </Table>
          </div>
        </Card>
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
