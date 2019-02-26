import * as React from 'react';
import { LoadingContainer } from './style';

const Loading: React.SFC = () => (
  <LoadingContainer>
    <i className="fas fa-spinner fa-pulse" />
  </LoadingContainer>
);

export default Loading;
