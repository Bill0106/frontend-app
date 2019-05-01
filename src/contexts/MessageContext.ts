import * as React from 'react';

export interface MessageContextValue {
  setError: (text: string) => void;
}

const MessageContext = React.createContext({} as MessageContextValue);

export default MessageContext;
