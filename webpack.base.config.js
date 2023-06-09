const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [path.join(__dirname, 'frontend', 'js', 'app.js')],
  },
  module: {
    rules: [
      {
        include: [path.join(__dirname, 'frontend', 'js')],
        loader: 'babel-loader',
        test: /\.jsx?$/,
      },
      {
        include: path.join(__dirname, 'frontend', 'img'),
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          'cache-loader',
          {
            loader: 'file-loader',
            options: {
              name: (filePath) => 'img/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              gifsicle: {
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
      {
        include: path.join(__dirname, 'frontend', 'icons'),
        test: /\.svg$/,
        use: 'url-loader',
      },
      {
        exclude: [
          path.join(__dirname, 'frontend', 'icons'),
          path.join(__dirname, 'frontend', 'img'),
        ],
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]',
      },
      {
        include: path.join(__dirname, 'frontend'),
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]',
        },
        test: /\.ico$/,
      },
      {
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff',
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      },
      {
        include: path.join(__dirname, 'frontend', 'css'),
        loader: 'style-loader!css-loader',
        test: /\.css$/,
      },
      {
        include: [
          path.join(__dirname, 'frontend', 'scss'),
          path.join(__dirname, 'frontend', 'js', 'react'),
        ],
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  output: {
    chunkFilename: '[name].[id].js',
    filename: 'js/[name].js',
    path: path.join(__dirname, 'backend', 'static'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: (module) =>
        module.context && module.context.includes('node_modules'),
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'backend', 'robots.txt') },
    ]),
  ],
  resolve: {
    alias: {
      '../../theme.config$': path.join(
        __dirname,
        'frontend',
        'styling',
        'theme.config',
      ),
      '@backend': path.join(__dirname, 'backend'),
      '@frontend': path.join(__dirname, 'frontend'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: { colors: true, reasons: true },
};
