const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./kramaaClient/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      }
    ]
  },
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
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
