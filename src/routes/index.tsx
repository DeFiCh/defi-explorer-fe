import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainnetRoutes from './Mainnet';
import routes from './Routes';

const Routes = (location) => (
  <>
    <Switch location={location}>
      <Route path='/:chain/:network' component={MainnetRoutes} />
    </Switch>
  </>
);

export default Routes;
