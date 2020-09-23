import React, { useEffect } from "react";
import { connect } from "react-redux";
import { startQuickStatus } from "../../reducer";
import { setIntervalSynchronous } from "../../../../utils/utility";
import { QUICK_STATUS_INTERVAL } from "../../../../constants";
import { Row, Col } from "reactstrap";
import { isEmpty } from "lodash";
import { I18n } from "react-redux-i18n";

interface QuickStatusComponentProps {
  quickStatus: any;
  quickStatusError: string;
  startQuickStatus: () => void;
}

const QuickStatusComponent: React.FunctionComponent<QuickStatusComponentProps> = (
  props: QuickStatusComponentProps
) => {
  const { quickStatus, quickStatusError, startQuickStatus } = props;
  useEffect(() => {
    startQuickStatus();
    const clearInt = setIntervalSynchronous(
      startQuickStatus,
      QUICK_STATUS_INTERVAL
    );
    return clearInt;
  }, []);

  const loadQuickStatusHtml = () => {
    if (quickStatusError) {
      return <div>{quickStatusError}</div>;
    }
    if (isEmpty(quickStatus)) {
      return <div>Loading</div>;
    }
    return (
      <>
        <Row>
          <Col className="heading mt-2" xs={12}>
            <label className="text-uppercase font-weight-bold">
              {I18n.t(
                "containers.homePage.about.quickStatus.generalInformation"
              )}
            </label>
          </Col>
          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.chain")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.chain}
          </Col>
          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.block")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.blockHeight}
          </Col>

          <Col className="heading mt-2" xs={12}>
            <label className="text-uppercase font-weight-bold">
              {I18n.t("containers.homePage.about.quickStatus.supply")}
            </label>
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.total")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.supply.total}
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.supplyCirculation")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.supply.circulation}
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.supplyFoundation")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.supply.foundation}
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.supplyCommunity")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.supply.community}
          </Col>

          <Col className="heading mt-2" xs={12}>
            <label className="text-uppercase font-weight-bold">
              {I18n.t("containers.homePage.about.quickStatus.rewards")}
            </label>
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.rewardsTotal")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.rewards.total}
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.rewardsCommunity")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.rewards.community}
          </Col>

          <Col xs={6}>
            {I18n.t("containers.homePage.about.quickStatus.rewardsMinter")}
          </Col>
          <Col xs={6} className="text-right">
            {quickStatus.rewards.minter}
          </Col>
        </Row>
      </>
    );
  };
  return (
    <>
      <h1>Quick Status</h1>
      {loadQuickStatusHtml()}
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    home: { quickStatus, quickStatusError },
  } = state;
  return {
    quickStatus,
    quickStatusError,
  };
};

const mapDispatchToProps = {
  startQuickStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickStatusComponent);
