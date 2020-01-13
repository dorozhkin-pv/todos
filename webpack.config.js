const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');

const conf = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, './js'), // в идеале полный
    filename: 'bundle.js',
    //publicPath: 'js/'
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'app/components/'),
      '@store': path.resolve(__dirname, 'app/store/'),
      '@helpers': path.resolve(__dirname, 'app/helpers/'),
    }
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
        // exclude: 'node_modules'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      showErrors: true,
      title: 'Todos',
      template: path.resolve(__dirname, 'app/index.html')
    })
  ]
};

module.exports = (env, options) => {
  conf.devtool = options.mode === 'production' ? false : 'cheap-module-eval-source-map';

  return conf;
};
