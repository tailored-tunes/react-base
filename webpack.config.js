const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

const autoPrefixerOptions = {};
const cssnanoConfig = {};

let PRODUCTION = false;

if(process.env.NODE_ENV && process.env.NODE_ENV==='production') {
	PRODUCTION = true;
}

const postCssOptions = function () {
	let plugins = [];

	if (PRODUCTION === true) {
		plugins = [
			autoprefixer(autoPrefixerOptions),
			cssnano(cssnanoConfig)
		]
	} else {
		plugins = [
			autoprefixer(autoPrefixerOptions)
		]
	}
	return {plugins: plugins};
};


module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'./src/index.js',
		'./src/stylesheets/main.scss'
	],
	output: {
		path: path.resolve('dist'),
		filename: PRODUCTION ? 'index_bundle_[hash].js' : 'index_bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract([
					'css-loader',
					{loader: 'postcss-loader', options: postCssOptions()},
					'sass-loader'
				])
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	stats: {
		children: false  //to prevent double logs from sass lint
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development'
		}),
		HtmlWebpackPluginConfig,
		new ExtractTextPlugin({
			filename: PRODUCTION ? '[name].[hash].bundle.css' : '[name].bundle.css',
			allChunks: true,
		}),
		new StyleLintPlugin({}),
	],
	devServer: {
		port: 3000,
		hot: true,
		overlay: {
			errors: true,
			warnings: true,
		}
	}
};
