import capitalize from 'lodash/capitalize';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import FooterComponent from '../components/Footer';
import { NETWORK } from '../constants';
import NavbarComponent from '../containers/NavBar';
import routes from '../routes';
import './App.scss'; // INFO: do not move down, placed on purpose
// import Websocket from '../utils/webSocket';

const App: React.FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { location } = props;
  return (
    <div id='app'>
      <Helmet>
        <title>
          {I18n.t('app.title', {
            network: capitalize(NETWORK),
          })}
        </title>
      </Helmet>
      <main className='overflow-auto'>
        <NavbarComponent />
        <Container fluid className='mt-5'>
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
