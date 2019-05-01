import * as React from 'react';
import { Router } from '@reach/router';
import MessageContext from '@/contexts/MessageContext';
import Layout from '@/layouts/AppLayout';
import ErrorMessage from '@/components/ErrorMessage';
import Home from '@/pages/Home';
import Games from '@/pages/Games';
import Gourmets from '@/pages/Gourmets';

const { useState } = React;

const App: React.SFC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const handleError = (text: string) => {
    setErrorMessage(text);
    setErrorVisible(true);

    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ setError: handleError }}>
      <Router>
        <Home path="/" />
        <Layout default>
          <Games path="/games/*" />
          <Gourmets path="/gourmets" />
        </Layout>
      </Router>
      <ErrorMessage visible={errorVisible} text={errorMessage} />
    </MessageContext.Provider>
  );
};

export default App;
