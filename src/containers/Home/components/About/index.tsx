import React from "react";
import { Col, Row } from "reactstrap";
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
