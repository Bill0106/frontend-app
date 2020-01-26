import * as React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import List from './List';
import Detail from './Detail';

const Games: React.SFC<RouteComponentProps> = () => (
  <Router>
    <List path="/" />
    <Detail path="/:id" />
  </Router>
);

export default Games;
