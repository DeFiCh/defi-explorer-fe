import React from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col } from "reactstrap";

interface LatestBlocksComponentProps extends RouteComponentProps {
  blocks: any[];
}

const LatestBlocksComponent: React.FunctionComponent<LatestBlocksComponentProps> = (
  props: LatestBlocksComponentProps
) => {
  const { blocks } = props;
  return (
    <>
      <h1>Latest Blocks</h1>
      <div>
        <Row>
          <Col xs={3}>{I18n.t("containers.homePage.latestBlock.height")}</Col>
          <Col xs={3}>{I18n.t("containers.homePage.latestBlock.time")}</Col>
          <Col xs={3}>
            {I18n.t("containers.homePage.latestBlock.transactionCount")}
          </Col>
          <Col xs={3}>{I18n.t("containers.homePage.latestBlock.size")}</Col>
        </Row>
        {blocks.map((item, id) => (
          <Row key={id}>
            <Col xs={3}>{item.height}</Col>
            <Col xs={3}>{item.time}</Col>
            <Col xs={3}>{item.transactionCount}</Col>
            <Col xs={3}>{item.size}</Col>
          </Row>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    websocket: { blocks },
  } = state;
  return {
    blocks,
  };
};

export default connect(mapStateToProps)(LatestBlocksComponent);
