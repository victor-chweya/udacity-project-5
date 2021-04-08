
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
});
// const path = require('path')
// const webpack = require('webpack')
// const HtmlWebPackPlugin = require("html-webpack-plugin")


// module.exports = {
//     entry: './src/client/index.js',
//     mode: 'development',
//     devtool: 'source-map',
//     stats: 'verbose',
//     output: {
//         libraryTarget: 'var',
//         library: 'Client'
//     },
//     module: {
//         rules: [
//             {
//                 test: '/\.js$/',
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 }
//             },
//             {
//                 test: /\.scss$/,
//                 use: [ 'style-loader', 'css-loader', 'sass-loader' ]
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: "./src/client/views/index.html",
//             filename: "./index.html",
//         }),
 
//     ]
// }
