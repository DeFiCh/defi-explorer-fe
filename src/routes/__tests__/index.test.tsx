import React from 'react';
import { shallow } from 'enzyme';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import route from '../index';
let pathMap = {};

describe('Routing', () => {
  // beforeAll(() => {
  //   const component = shallow(
  //     <Router>
  //       {route({
  //         pathname: '/',
  //         search: '',
  //         hash: '',
  //         state: undefined,
  //       })}
  //     </Router>
  //   );
  //   pathMap = component.find(Route).map((item) => item.props());
  // });
});
