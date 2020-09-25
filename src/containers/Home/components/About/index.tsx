import React from "react";
import { I18n } from "react-redux-i18n";
import { Col, Row } from "reactstrap";
import {
  DEFICHAIN_IO_SITE,
  RICH_LIST_PATH,
  GITHUB_LINK,
  RELEASE_LINK,
  WHITE_PAPER_LINK,
} from "../../../../constants";
import QuickStatus from "../QuickStatus";

const About: React.FunctionComponent = () => {
  return (
    <>
      <h1>{I18n.t("containers.homePage.about.aboutTitle")}</h1>
      <Row>
        <Col xs={12}>
          <p>{I18n.t("containers.homePage.about.aboutContent")}</p>
          <p>
            <p>
              {I18n.t("containers.homePage.about.forMoreInfoNotice")}{" "}
              <a href={DEFICHAIN_IO_SITE} rel="nofollow" target="_blank">
                {I18n.t("containers.homePage.about.defichainLink")}
              </a>
            </p>
          </p>
        </Col>
        <Col xs={12}>
          <h1>{I18n.t("containers.homePage.about.resource.resourceTitle")}</h1>
          <ul>
            <li>
              {" "}
              <a href={GITHUB_LINK} target="_blank">
                {I18n.t("containers.homePage.about.resource.gitHubLink")}
              </a>
            </li>
            <li>
              <a href={RELEASE_LINK} target="_blank">
                {I18n.t(
                  "containers.homePage.about.resource.binaryReleasesLink"
                )}
              </a>
            </li>
            <li>
              <a href={WHITE_PAPER_LINK} target="_blank">
                {I18n.t("containers.homePage.about.resource.whitePaperLink")}
              </a>
            </li>
            <li>
              <a href={RICH_LIST_PATH}>
                {I18n.t("containers.homePage.about.resource.richListLink")}
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={12}>
          <QuickStatus />
        </Col>
      </Row>
    </>
  );
};

export default About;
