import React from 'react';
import { object } from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import RouterProvider from './routes';
import ContextProvider from './context';

const cache = new InMemoryCache({
  dataIdFromObject: result => (result.id && result.__typename ? `${result.__typename}${result.id}` : result.id),
  addTypename: true,
});

const client = new ApolloClient({
  ssrMode: false,
  options: {
    connectToDevTools: process.env.NODE_ENV !== 'production',
    queryDeduplication: true,
  },
  cache: cache,
  link: new BatchHttpLink({
    uri: 'http://10.255.13.111:9000/', // url for your hosted graphql server
  }),
});

const App = ({ history }) => {
  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <RouterProvider history={history} />
      </ContextProvider>
    </ApolloProvider>
  );
};

App.propTypes = {
  history: object.isRequired,
};

export default hot(App);
