import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: './src/client/client.tsx',
  mode: isProduction ? 'production' : 'development',
  target: 'web',
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, '../build/client'),
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
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/assets/template/index.html',
      filename: 'index.html',
      inject: true,
      minify: isProduction
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      filename: '[path][base].gz',
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
  devServer: {
    allowedHosts: 'all',
    bonjour: false,
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
      progress: true,
    },
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    },
    headers: {
      'X-Custom-Header': 'yes',
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    liveReload: true,
    onListening: (devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const port = devServer.server.address().port;
      console.log(`Listening on port: ${port}`);
    },
    open: false,
    port: 9000,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    ],
    setupExitSignals: true,
    static: {
      directory: path.join(__dirname, '../build/client'),
      watch: true,
      staticOptions: {
        setHeaders: (res, filepath) => {
          if (filepath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
          }
          if (filepath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
          }
        },
      },
    },
    watchFiles: ['src/**/*.*'],
  },
};