const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = baseConfig;
config.output.filename = 'js/[name].[chunkhash].js';
config.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new ManifestPlugin({ fileName: 'webpack_manifest.json' }),
);
config.output.publicPath = '/';

module.exports = config;
