import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Nav from '@/components/Nav';
import { Layout, Content } from './style';

const AppLayout: React.SFC<RouteComponentProps> = ({ children }) => {
  return (
    <Layout>
      <Nav />
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
