const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const { resolve } = path
const ENV = process.env.NODE_ENV
const IS_PRODUCTION = ENV === 'production'

const config = {
  devtool: IS_PRODUCTION ? 'nosources-source-map' : 'eval',
  entry: ['babel-polyfill', resolve(__dirname, '../app/index.js')],
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader:'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: IS_PRODUCTION,
              modules: true,
              localIdentName: '[local]--[hash:base64:3]'
            }
          }
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'app': resolve(__dirname, '../app')
    },
    extensions: ['.js', '.jsx', '.css'],
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html'),
      inject: true,
      minimize: IS_PRODUCTION
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !IS_PRODUCTION
    })
  ]
}

if (IS_PRODUCTION) {
  config.plugins.push(new UglifyJSPlugin({
    parallel: true
  }))
}

module.exports = config