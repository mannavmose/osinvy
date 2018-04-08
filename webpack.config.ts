import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import * as autoprefixer from 'autoprefixer';

export const SRC_PATH = path.resolve(__dirname, 'src');
export const DIST_PATH = path.resolve(__dirname, 'dist');

const typeScriptRule: webpack.Rule = {
  test: /\.tsx?$/,
  use: [
    'ts-loader',
  ],
};

const stylesRule: webpack.Rule = {
  test: /\.sass$/,
  include: SRC_PATH,
  use: [
    'style-loader',
    {
      loader: 'typings-for-css-modules-loader',
      query: {
        modules: true,
        namedExport: true,
        camelCase: true,
        localIdentName: '[name]_[local]_[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    'sass-loader',
  ],
};

const htmlPlugin: webpack.Plugin = new HtmlWebpackPlugin({
  inject: 'body',
  template: SRC_PATH + '/index.html',
  title: 'Invy',
});

let config: webpack.Configuration = {
  entry: {
    index: path.join(SRC_PATH, 'index.tsx'),
  },
  module: {
    rules: [
      typeScriptRule,
      stylesRule,
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH,
  },
  plugins: [
    htmlPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      components: path.resolve(SRC_PATH, 'components'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.css', '.json'],
    modules: [
      'node_modules',
      SRC_PATH,
    ],
  },
  mode: 'development',
};

export default config;
