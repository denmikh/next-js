const ManifestPlugin = require('webpack-manifest-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const env = require('./env');
const baseConfig = require('./webpack.base.config.js');
const config = baseConfig;
config.output.filename = 'js/[name].[chunkhash].js';

config.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new ManifestPlugin({ fileName: 'webpack_manifest.json' }),
  new SentryWebpackPlugin({
    authToken: env.SENTRY_AUTH_TOKEN,
    include: 'frontend',
    release: `${env.NPM_PACKAGE_NAME}@${env.NPM_PACKAGE_VERSION}`,
  }),
);
config.plugins.push(
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
      },
      sourceMap: true,
    },
  }),
);
config.output.publicPath = '/';

module.exports = config;
