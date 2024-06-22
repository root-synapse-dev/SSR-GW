import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
import CompressionPlugin from 'compression-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

export default {
  entry: './src/server/server.tsx',
  mode: mode,
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: [/\.css$/],
    }),
  ],
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, '../build/server'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          'thread-loader',
          {
            loader: 'esbuild-loader',
            options: { target: 'esnext' },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.*/,
      threshold: 10240,
      minRatio: 0.8,
      exclude: /node_modules/,
    }),
  ],
  cache: {
    type: 'filesystem',
  },
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'esnext',
        css: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};
