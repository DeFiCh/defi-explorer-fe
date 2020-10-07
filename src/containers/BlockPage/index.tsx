import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getBlockFromHash } from "./reducer";

interface BlockPageProps extends RouteComponentProps {
  getBlockFromHash: (blockHash: string) => void;
}

const BlockPage: React.FunctionComponent<BlockPageProps> = (
  props: BlockPageProps
) => {
  const {
    match: { params = {} },
    getBlockFromHash,
  } = props;

  useEffect(() => {
    getBlockFromHash(params.blockHash);
  }, []);

  return <div />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getBlockFromHash: (blockHash) => getBlockFromHash(blockHash),
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockPage);
