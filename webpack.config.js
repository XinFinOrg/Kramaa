// webpack v4
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: "./kramaaClient/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './kramaaClient/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
      filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "./kramaaClient"),
    port: 8080,
    historyApiFallback: true,
    hotOnly: true,
    proxy: {
      '/api/*': 'http://localhost:80'
    }
  }
};
