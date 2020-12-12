const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    main: './index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    filename: '[name].[contents].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@/api/': path.join(__dirname, './src/api'),
      '@/store/': path.join(__dirname, './src/store'),
      '@/types/': path.join(__dirname, './src/types'),
      '@/constants/*': path.join(__dirname, './src/constants'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname)],
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          configFile: './tsconfig.json',
        },
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  devtool: 'source-map',
};
