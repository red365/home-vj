const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.resolve( __dirname, 'dist/static'),
    filename: "bundle.[chunkhash].js",
    publicPath: '/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin(), 
    new ExtractTextPlugin('[name].[contenthash].css'),
    new BundleTracker({filename: './webpack-stats.json'}),
    new CleanWebpackPlugin('./dist/static/*')
  ],
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { minimize: true, modules: true, localIdentName: '[local]__[name]' } }
            ],
            // use this, if CSS isn't extracted
            fallback: 'style-loader'
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { minimize: false, modules: true, localIdentName: '[local]__[name]' } },
              { loader: 'postcss-loader', options: { plugins: () => [
                    autoprefixer()
                  ]
                }
              },
                'resolve-url-loader',
                'sass-loader',
            ],
            fallback: 'style-loader'
        }),
      },
      {
        test: /\.(|jpg|jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          name: 'img/[hash].[ext]',
          publicPath: '/',
          limit: 25000,
        },
      },
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  }
}
