import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: './src/server/server.tsx',
  mode: isProduction ? 'production' : 'development',
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: [/\.css$/],
    }),
  ],
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, '../build/server'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          'thread-loader',
          {
            loader: 'esbuild-loader',
            options: { target: 'es2020' },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: [
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
  ],
  cache: {
    type: 'filesystem',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
          warnings: false,
          parse: {},
          keep_classnames: true,
          keep_fnames: true,
          output: {
            comments: false,
            ascii_only: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};