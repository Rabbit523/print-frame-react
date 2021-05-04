const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-tools/webpack.${env}`)(env);
const presetConfig = require('./build-tools/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: ['babel-polyfill', './src/App.tsx'],
      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre',
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
          {
            test: /\.(png|jpeg|jpg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  outputPath: 'images',
                  limit: 1048576,
                },
              },
            ],
          },
        ],
      },
      node: {
        fs: 'empty',
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/html/index.html',
        }),
        new webpack.ProgressPlugin(),
      ],
    },

    modeConfig(mode),
    presetConfig({ mode, presets }),
  );
};
