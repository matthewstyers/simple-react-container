import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import TechnologyIndex from './components/technology_index';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={TechnologyIndex} />
  </Route>
);
