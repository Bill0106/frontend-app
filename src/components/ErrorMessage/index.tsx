import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Message, MessageContent, Text } from './style';

interface Props {
  text: string;
  visible: boolean;
}

const ErrorMessage: React.SFC<Props> = ({ text, visible }) => (
  <Message show={visible}>
    <MessageContent>
      <FontAwesomeIcon icon="exclamation-circle" color="red" />
      <Text>{text}</Text>
    </MessageContent>
  </Message>
);

export default ErrorMessage;
