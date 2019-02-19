import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Games from '@/pages/Games';

const App: React.SFC = () => (
  <Router>
    <Home path="/" />
    <Layout default>
      <Games path="/games/*" />
    </Layout>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
