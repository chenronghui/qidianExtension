const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const pkg = require('./package.json');

const env = process.env.NODE_ENV;

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: `./${pkg.name}`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
};

module.exports = merge({
  context: __dirname,
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, `./${pkg.name}`),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './manifest.json') },
      ],
    }),
  ],
}, env ? devConfig : {});
