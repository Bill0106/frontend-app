import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Nav from '@/layouts/Nav';
import { Layout, Content } from './style';

const backgrounds: { [key: string]: string } = {
  games: '#303030',
  gourmets: '#F7F2EB',
  movies: '#272727',
};

const AppLayout: React.SFC<RouteComponentProps> = ({ children, location }) => {
  const path = location && location.pathname.split('/').filter(item => item)[0];

  return (
    <Layout background={backgrounds[path || 'games']}>
      <Nav />
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
