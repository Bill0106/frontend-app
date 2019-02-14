import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Layout } from './style';

export default class AppLayout extends React.Component<RouteComponentProps> {
  render() {
    const { children } = this.props;

    return <Layout>{children}</Layout>;
  }
}
