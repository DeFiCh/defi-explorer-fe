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
      <Row>
        <Col xs={12}>
          <QuickStatus />
        </Col>
      </Row>
    </>
  );
};

export default About;
