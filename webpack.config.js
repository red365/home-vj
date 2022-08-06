const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
var webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
console.log('MODE ', mode);

const entry = ['./src/index.jsx']
var plugins = undefined;

if (prod) {
	plugins = [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		// Use NoErrorsPlugin for webpack 1.x
		new webpack.NoEmitOnErrorsPlugin(),
	]
} else {
	entry.push('webpack-hot-middleware/client');
	plugins = [
		new ReactRefreshWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	].filter(Boolean)
}
		
module.exports = {
	// entry: {
	// 	'static/bundle': ['./src/main.js'],
	//   'webpack-hot-middleware/client',
	// },
	entry,
	output: {
		path: path.join(__dirname, '/public', '/build'),
		filename: 'bundle.js',
		chunkFilename: 'bundle.[id].js',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							plugins: [!prod && require.resolve('react-refresh/babel')].filter(Boolean),
						},
					},
				],
			},
			{
				test: /\.(jpe?g|gif|png)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
				},
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							minimize: true, 
							modules: true, 
							localIdentName: '[local]__[name]'
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					// Creates `style` nodes from JS strings
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			}
		],
	},
	mode,
	plugins,
	devtool: prod ? false : 'source-map',
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			views: path.resolve(__dirname, 'src/views/'),
		},
        extensions: ['.js', '.jsx']
	}
};
