const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client/?http://localhost:3000',
    './jsx/app.jsx'
  ],
  output: {
    publicPath: 'js/',
    path: __dirname + '/js/',
    filename: 'bundle.js'
  },
  devtool: '#sourcemap',
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  },
  devServer: {
      hot: true,
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        "/resources": "http://localhost:8080/Hello"
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}
