import { useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider, Container, Box } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import Appbar from './components/Appbar';
import AppRouter from './utils/AppRouter';

import CustomMUITheme from './styles/theme';
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_GRAPH_QL,
  cache: new InMemoryCache({
    typePolicies: {
      Posts: {
        keyFields: ['id'],
      },
      Users: {
        keyFields: ['id', 'email'],
      },
    },
  }),
});

function App() {
  useEffect(() => {
    console.log(`URL:${process.env.REACT_APP_API_GRAPH_QL}`);
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={CustomMUITheme}>
        <div
          style={{ width: '100%', height: '100%', backgroundColor: '#fafafa' }}
          className="App">
          <BrowserRouter>
            <Appbar />
            <Container maxWidth="sm">
              <Box my={6}>
                <AppRouter />
              </Box>
            </Container>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
