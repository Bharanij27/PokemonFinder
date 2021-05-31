import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

module.exports = {
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "scss-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src", "index.html")
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
};