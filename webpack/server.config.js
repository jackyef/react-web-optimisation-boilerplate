require('dotenv').config();

import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { ifDev, isDev, isProd } from './build-utils';
import { module as sharedModule, plugins as sharedPlugins } from './shared.config.js';

const publicPath = `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/`;

const developmentPlugins = () => {
  if (isDev) {
    // need to lazy load this plugin
    const StartServerPlugin = require('start-server-webpack-plugin');

    return [new StartServerPlugin('server.js'), new webpack.HotModuleReplacementPlugin()];
  }

  return [];
};

export default {
  entry: {
    server: [
      ifDev('webpack/hot/poll?1000'),
      ifDev('./src/server/index.dev.js', './src/server/index.js'),
    ].filter(Boolean),
  },
  target: 'node', // tells webpack that this build will be run in node env
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/server'),
    publicPath,
  },
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    ...sharedModule,
    rules: [
      ...sharedModule.rules,
      {
        test: /\.(png|jpe?g|gif|svg)$/, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name (_file) {
                if (process.env.NODE_ENV === 'development') {
                  return '[path][name].[ext]';
                } else {
                  return '[hash].[ext]';
                }
              }
            },
          },
        ]
      },
    ],
  },
  externals: [
    /**
     * Ignore node_modules being bundled
     * on server build
     */
    nodeExternals({
      whitelist: [
        ...ifDev(['webpack/hot/poll?1000'], []),
        'source-map-support/register',
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(css|scss|sass|sss|less)$/,
      ],
    }),
  ],
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isDev,
      __PROD__: isProd,
      __CLIENT__: false,
      __SERVER__: true,
    }),
    ...sharedPlugins,
    ...developmentPlugins(),
  ].filter(Boolean),
};
