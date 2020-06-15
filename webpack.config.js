const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const settings = {
  distPath: path.join(__dirname, 'build'),
  srcPath: path.join(__dirname, 'src'),
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath);
}

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  return {
    entry: {
      index: srcPathExtend('index.js'),
    },
    output: {
      path: settings.distPath,
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: 'assets/js/[id].[chunkhash].[hash].js',
      publicPath: '/',
    },
    devtool: isDevMode ? 'source-map' : false,
    resolve: {
      modules: ['node_modules', 'src/js', 'src'],
      extensions: ['.js', '.jsx', '.scss'],
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevMode,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  // eslint-disable-next-line global-require
                  require('autoprefixer')(),
                ],
                sourceMap: isDevMode,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              modules: true,
              sourceMap: isDevMode,
              outputPath: 'assets/images',
            },
          },
        },
      ],
    },
    devServer: {
      overlay: true,
      contentBase: '/',
      historyApiFallback: true,
      compress: true,
      port: 3001,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        template: srcPathExtend('index.html'),
        favicon: srcPathExtend('favicon.ico'),
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[hash].css',
        chunkFilename: isDevMode
          ? '[id].[chunkhash].[hash].css'
          : 'assets/css/[id].[chunkhash].[hash].css',
      }),
    ],
  };
};
