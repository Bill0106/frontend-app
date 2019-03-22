import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingContainer } from './style';

const Loading: React.SFC = () => (
  <LoadingContainer>
    <FontAwesomeIcon icon={['fas', 'spinner']} pulse />
  </LoadingContainer>
);

export default Loading;
