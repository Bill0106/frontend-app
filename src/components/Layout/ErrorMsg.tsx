import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import message from '@/utils/message';
import { Message, MessageContent, Text } from './style';

const { useState, useEffect } = React;

const ErrorMsg: React.SFC = () => {
  let el: HTMLDivElement | null;
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleError = () => {
    if (message.data.type !== 'error') {
      return false;
    }

    setText(message.data.message);
    setShow(true);

    setTimeout(() => setShow(false), 3000);
  };

  useEffect(() => {
    if (el) {
      message.addListener(el, handleError);
    }

    return () => message.removeListener(handleError);
  }, []);

  return (
    <Message ref={div => (el = div)} show={show}>
      <MessageContent>
        <FontAwesomeIcon icon="exclamation-circle" color="red" />
        <Text>{text}</Text>
      </MessageContent>
    </Message>
  );
};

export default ErrorMsg;
