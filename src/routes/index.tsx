import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HOME_PAGE_PATH, INDEX_PATH, TRANSACTION_ID_PARAM_BASE_PATH, BLOCK_NUM_PARAM_BASE_PATH } from '../constants';
import HomePageComponent from '../containers/Home'

const routes = (location) => (
  <Switch location={location}>
    <Redirect from={INDEX_PATH} to={HOME_PAGE_PATH} />
    <Route exact path={HOME_PAGE_PATH} component={HomePageComponent} />
    <Route exact path={TRANSACTION_ID_PARAM_BASE_PATH} component={HomePageComponent} />
    <Route exact path={BLOCK_NUM_PARAM_BASE_PATH} component={HomePageComponent} />

  </Switch>
);

export default routes;
