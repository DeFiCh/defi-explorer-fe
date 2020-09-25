import React, { useCallback } from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import Table from "../../../../components/Table";
import getColumns from "./getColumns";

interface LatestBlocksComponentProps extends RouteComponentProps {
  blocks: any[];
}

const LatestBlocksComponent: React.FunctionComponent<LatestBlocksComponentProps> = (
  props: LatestBlocksComponentProps
) => {
  const { blocks } = props;
  return (
    <>
      <h1>{I18n.t("containers.homePage.latestBlock.latestBlockTitle")}</h1>
      <div>
        <Table columns={getColumns()} data={blocks} height={400}/>
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
