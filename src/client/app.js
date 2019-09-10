import React from 'react';
import { object } from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Routes from './routes';
import ContextProvider from './context';

const cache = new InMemoryCache({
  dataIdFromObject: result =>
    result.id && result.__typename ? `${result.__typename}${result.id}` : result.id,
  addTypename: true,
});

const client = new ApolloClient({
  ssrMode: false,
  options: {
    connectToDevTools: process.env.NODE_ENV !== 'production',
    queryDeduplication: true,
  },
  cache: window.__APOLLO_INITIAL_DATA__
    ? cache.restore(window.__APOLLO_INITIAL_DATA__)
    : cache,
  link: new BatchHttpLink({
    uri: 'https://24.staging-feature.tokopedia.com/graphql', // url for your hosted graphql server
  }),
});

const App = ({ history }) => {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ContextProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </ContextProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

App.propTypes = {
  history: object.isRequired,
};

export default hot(App);
