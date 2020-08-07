const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  target: 'node',
  mode: 'none',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: `index.js`
  },
  plugins: [
    new CleanWebpackPlugin(),   //参数是一个数组，数组中是需要删除的目录名
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          "presets": [[
            "@babel/preset-env",
            { "useBuiltIns": "usage" }
          ], "@vue/babel-preset-jsx"]
        }
      },
      {
        test: /.png$/,
        use: {
          loader: 'file-loader',
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 啟用 CSS 模組功能
            },
          },
        ],
      },
    ]
  }
};
// npx webpack --config ./webpack.config/webpack.config.js