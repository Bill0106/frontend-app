import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import List from './List';

const Games: React.SFC<RouteComponentProps> = () => (
  <Router>
    <List path="/" />
  </Router>
);

export default Games;
