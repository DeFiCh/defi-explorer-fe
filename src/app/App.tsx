import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";
import routes from "../routes";
import Websocket from "../utils/webSocket";
import "./App.scss"; // INFO: do not move down, placed on purpose

interface AppProps extends RouteComponentProps {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { location } = props;
  useEffect(() => {
    new Websocket();
  }, []);
  return (
    <div id="app">
      <Helmet>
        <title>DeFi Blockchain Explorer</title>
      </Helmet>
      <main>
        <Container>{routes(location)}</Container>
      </main>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
