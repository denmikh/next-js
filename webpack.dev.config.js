const webpack = require('webpack');
const baseConfig = require('./webpack.base.config.js');

const config = baseConfig;
config.entry.app.unshift(
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
);
config.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
);

config.devtool = 'source-map';
config.output.publicPath = '/';

module.exports = config;
