import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";
import FooterComponent from "../components/Footer";
import NavbarComponent from "../containers/NavBar";
import routes from "../routes";
import Websocket from "../utils/webSocket";
import "./App.scss"; // INFO: do not move down, placed on purpose

interface AppProps extends RouteComponentProps {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { location } = props;
  useEffect(() => {
    const webSocket = new Websocket();
  }, []);
  return (
    <div id="app">
      <Helmet>
        <title>DeFi Blockchain Explorer</title>
      </Helmet>
      <main className="overflow-auto">
        <NavbarComponent />
        <Container>
          {routes(location)}
          <FooterComponent />
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
