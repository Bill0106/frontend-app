import * as React from 'react';

export interface MessageContextValue {
  setError: (text: string) => void;
}

const { createContext, useContext, useRef, useEffect } = React;

const MessageContext = createContext({} as MessageContextValue);

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

const Provider: React.SFC<MessageContextValue> = ({ children, setError }) => (
  <MessageContext.Provider value={{ setError }}>
    {children}
  </MessageContext.Provider>
);

export { Provider as MessageProvider };
export default useMessage;
