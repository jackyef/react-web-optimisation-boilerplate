require('dotenv').config();

import React from 'react';
import { renderStylesToString } from 'emotion-server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StaticRouter } from 'react-router-dom';
import fetch from 'node-fetch';
import serialize from 'serialize-javascript';

import ContextProvider from '../../client/context';
import Routes from '../../client/routes';

// disable SSL authentication check
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const renderer = async (ctx, next) => {
  console.log('Incoming request for url', ctx.url);

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
      uri: 'https://24.staging-feature.tokopedia.com/graphql', // url for your hosted graphql server
      fetch: fetch,
    }),
  });
  
  const app = (
    <ApolloProvider client={client}>
      <ContextProvider>
        <StaticRouter context={{}}>
          <Routes />
        </StaticRouter>
      </ContextProvider>
    </ApolloProvider>
  )

  const renderedApp = renderStylesToString(await renderToStringWithData(app));

  const graphqlData = client.extract();

  ctx.set('content-type', 'text/html');
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>React Boilerplate</title>
      <script>
        window.isSSR = false;
        window.__APOLLO_INITIAL_DATA__ = ${serialize(graphqlData)};
      </script>
      <style>
        html, body {
            margin: 0;
            padding: 0;
            font-family: system-ui, sans-serif;
        }
      </style>
      </head>
      <body>
      <div id="root">${renderedApp}</div>
      <noscript>This web-app need javascript to run.</noscript>
      <script src="http://localhost:${process.env.CLIENT_PORT}/client.js"></script>
      <script src="http://localhost:${process.env.CLIENT_PORT}/vendor.js"></script>
    </body>
    </html>
  `.trim();

  await next();
}

export default renderer;
