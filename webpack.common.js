const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
      minify: false, //disable for production
    }),
  ],
  module: {
    rules: [
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.scss$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
        name: 'Client',
        type: 'var'
    },
  },
};