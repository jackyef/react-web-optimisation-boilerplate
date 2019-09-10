require('@babel/register');
require('dotenv').config();

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { ifDev, isProd } from './build-utils';
import { module as sharedModule, plugins as sharedPlugins } from './shared.config';

const publicPath = `http://localhost:${process.env.CLIENT_PORT}/`;

export default {
  entry: {
    client: ['./src/client/index.js'],
  },
  target: 'web', // tells webpack that this build will be run in browsers
  output: {
    // filename: ifDev('[name].js','[name].[hash].js'),
    filename: '[name].js',
    publicPath,
    path: path.resolve(__dirname, '../dist/client'),
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
                  return '[name].[ext]';
                } else {
                  return '[name].[ext]';
                }
              }
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath,
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              onlyLocals: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [postcssPresetEnv({ stage: 2 })],
            },
          },
        ]
      }
    ],
  },
  plugins: [
    ...sharedPlugins,
    new CompressionPlugin(),
    new HtmlWebpackPlugin({ template: 'src/client/index.html' }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    process.env.ANALYZE ? new BundleAnalyzerPlugin() : null,
  ].filter(Boolean),
  optimization: {
    nodeEnv: ifDev('development', 'production'),
    minimize: isProd,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  /**
   * Controls how source maps are generated
   * (https://webpack.js.org/configuration/devtool/)
   */
  devtool: ifDev('cheap-module-eval-source-map', '(none)'),
};
