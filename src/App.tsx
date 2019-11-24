import * as React from 'react';
import { Router } from '@reach/router';
import { MessageProvider } from '@/hooks/useMessage';
import Layout from '@/layouts/AppLayout';
import ErrorMessage from '@/components/ErrorMessage';
import Home from '@/pages/Home';
import Games from '@/pages/Games';
import Gourmets from '@/pages/Gourmets';
import Movies from '@/pages/Movies';

const { useState, useCallback } = React;

const App: React.SFC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const handleError = useCallback((text: string) => {
    setErrorMessage(text);
    setErrorVisible(true);

    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

  return (
    <MessageProvider setError={handleError}>
      <Router>
        <Home path="/" />
        <Layout default>
          <Games path="/games/*" />
          <Gourmets path="/gourmets" />
          <Movies path="movies" />
        </Layout>
      </Router>
      <ErrorMessage visible={errorVisible} text={errorMessage} />
    </MessageProvider>
  );
};

export default App;
