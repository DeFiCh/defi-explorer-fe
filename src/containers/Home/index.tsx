import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import About from "./components/About";
import LatestBlocks from "./components/LatestBlocks";
import LatestTransactions from "./components/LatestTransactions";

interface HomePageProps extends RouteComponentProps {}

const HomePage: React.FunctionComponent<HomePageProps> = (
  props: HomePageProps
) => {
  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <Col xs={12}>
              <LatestBlocks {...props} />
            </Col>
            <Col xs={12} className='text-center'>
              <span>
                <Button>
                  See all blocks
                </Button>
              </span>
              <span className='ml-4'>
                <Button>
                  See all anchored blocks
                </Button>
              </span>
            </Col>
            <Col xs={12} className="mt-4">
              <LatestTransactions {...props} />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <About />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
