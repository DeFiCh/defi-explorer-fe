import React, { useEffect } from "react";
import CopyToClipIcon from "../../components/CopyToClipIcon";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { RouteComponentProps } from "react-router-dom";
import { Col, Row } from "reactstrap";
import KeyValueLi from "../../components/KeyValueLi";
import { AppBlock } from "../../utils/interfaces";
import { getBlockFromHash } from "./reducer";
import { BLOCK_PAGE_BASE_PATH } from "../../constants";
import BlockTxn from "../../components/BlockTxn";
import moment from "moment";

interface RouteInfo {
  blockHash: string;
}

interface BlockPageProps extends RouteComponentProps<RouteInfo> {
  getBlockFromHash: (blockHash: string) => void;
  block: AppBlock;
  isLoading: boolean;
  isError: string;
  transactions: any;
}

const BlockPage: React.FunctionComponent<BlockPageProps> = (
  props: BlockPageProps
) => {
  const {
    match: { params },
    getBlockFromHash,
    block: {
      height,
      merkleroot,
      size,
      confirmations,
      version,
      difficulty,
      bits,
      hash,
      time,
      txlength,
      previousblockhash,
      nextblockhash,
      reward,
      tx,
    },
    isLoading,
    isError,
    transactions,
  } = props;

  console.log(time);

  useEffect(() => {
    getBlockFromHash(params.blockHash);
  }, [params]);

  const loadHtml = () => {
    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>{isError}</div>;
    return (
      <Row>
        <Col xs="12">
          <h1>
            {I18n.t("containers.blockPage.blockTitle", {
              height,
            })}
          </h1>
          <div className="my-2">
            <span>{I18n.t("containers.blockPage.blockHash")}: </span>
            <span>{hash}</span>
            <span>
              <CopyToClipIcon value={hash!} uid={"blockHashCopy"} />
            </span>
          </div>
        </Col>
        <Col xs="12">
          <h1>{I18n.t("containers.blockPage.summary")}</h1>
          <Row>
            <Col xs="12" md="6">
              <KeyValueLi
                label={I18n.t("containers.blockPage.numOfTxns")}
                value={`${txlength}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.height")}
                value={`${height}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.block")}
                value={`${reward}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.timestamp")}
                value={`${moment(time).format("lll")}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.merkleRoot")}
                value={`${merkleroot}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.previousBlock")}
                value={`${height - 1}`}
                href={`${BLOCK_PAGE_BASE_PATH}/${previousblockhash}`}
              />
            </Col>
            <Col xs="12" md="6">
              <KeyValueLi
                label={I18n.t("containers.blockPage.difficulty")}
                value={`${difficulty}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.bits")}
                value={`${bits}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.size")}
                value={`${size}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.version")}
                value={`${version}`}
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.nextBlock")}
                value={`${height + 1}`}
                href={
                  !!nextblockhash && `${BLOCK_PAGE_BASE_PATH}/${nextblockhash}`
                }
              />
              <KeyValueLi
                label={I18n.t("containers.blockPage.confirmations")}
                value={`${confirmations}`}
              />
            </Col>
          </Row>
        </Col>
        <Col xs="12">{/* <BlockTxn /> */}</Col>
      </Row>
    );
  };
  return <div className="mt-4">{loadHtml()}</div>;
};

const mapStateToProps = (state) => {
  const {
    blockPage: {
      block: { isLoading, isError, data },
      transactions,
    },
  } = state;

  return {
    block: data,
    isLoading,
    isError,
    transactions,
  };
};

const mapDispatchToProps = {
  getBlockFromHash: (blockHash) => getBlockFromHash({ blockHash }),
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockPage);
