import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Nav from '@/components/Nav';
import { Layout, Content } from './style';

const AppLayout: React.SFC<RouteComponentProps> = ({ children, location }) => {
  const backgrounds: { [key: string]: string } = {
    games: '#303030',
    gourmets: '#F7F2EB',
  };

  const path = location && location.pathname.split('/').filter(item => item)[0];

  return (
    <Layout background={backgrounds[path || '']}>
      <Nav />
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
