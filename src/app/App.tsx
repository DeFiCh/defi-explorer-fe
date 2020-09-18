import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import './App.scss'; // INFO: do not move down, placed on purpose

interface AppProps extends RouteComponentProps {
}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  return <h1>Defi Explorer</h1>
};

const mapStateToProps = () => {};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
