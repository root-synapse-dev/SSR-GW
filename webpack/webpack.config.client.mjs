import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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
  entry: './src/client/client.tsx',
  mode: mode,
  target: 'web',
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build/client'),
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
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    ],
    setupExitSignals: true,
    setupMiddlewares: (middlewares) => {
      console.log('Configurando middlewares personalizados...');
      return middlewares;
    },
    static: {
      directory: path.join(__dirname, '../build/client'),
      watch: true,
    },
    watchFiles: ['src/**/*.*'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/assets/template/index.html',
      filename: 'index.html',
      inject: 'body',
      minify:
        mode === 'production'
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
