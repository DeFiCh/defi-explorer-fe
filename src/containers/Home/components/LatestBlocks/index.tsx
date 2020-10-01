import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import Table from "../../../../components/Table";
import { fetchLatestBlocks } from "../../../Websocket/reducer";
import getColumns from "./getColumns";

interface LatestBlocksComponentProps extends RouteComponentProps {
  blocks: any[];
  fetchLatestBlocks: () => void;
}

const LatestBlocksComponent: React.FunctionComponent<LatestBlocksComponentProps> = (
  props: LatestBlocksComponentProps
) => {
  const { blocks, fetchLatestBlocks } = props;
  
  useEffect(() => {
    fetchLatestBlocks();
  }, []);

  return (
    <>
      <h1>{I18n.t("containers.homePage.latestBlock.latestBlockTitle")}</h1>
      <div>
        <Table columns={getColumns(props)} data={blocks} height={400} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    websocket: {
      blockResponse: { data },
    },
  } = state;
  return {
    blocks: data,
  };
};

const mapDispatchToProps = {
  fetchLatestBlocks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestBlocksComponent);
