import * as React from 'react';
import MessageContext from '@/contexts/MessageContext';

const { useContext, useRef, useEffect } = React;

const useMessage = (message: string) => {
  const { setError } = useContext(MessageContext);
  const error = useRef('');

  useEffect(() => {
    if (message && error.current !== message) {
      setError(message);
      error.current = message;
    }
  }, [setError, message]);
};

export default useMessage;
