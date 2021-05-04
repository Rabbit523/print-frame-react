const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = () => ({
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: path.join(__dirname, './../dist'),
    compress: true,
    stats: 'errors-only',
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
});
