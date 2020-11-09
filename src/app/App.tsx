import capitalize from 'lodash/capitalize';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import FooterComponent from '../components/Footer';
import NavbarComponent from '../containers/NavBar';
import BaseRoute from '../routes';
import './App.scss'; // INFO: do not move down, placed on purpose
// import Websocket from '../utils/webSocket';

interface AppProps extends RouteComponentProps {
  network: string;
}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { network, location } = props;

  return (
    <div id='app'>
      <Helmet>
        <title>
          {I18n.t('app.title', {
            network: capitalize(network),
          })}
        </title>
      </Helmet>
      <main className='overflow-auto'>
        <NavbarComponent />
        <Container fluid className='mt-5'>
          {BaseRoute(location)}
          <FooterComponent />
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  network: app.network,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
