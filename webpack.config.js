const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

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
		filename: 'index_bundle_[hash].js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract([{loader: 'css-loader', options: { minimize: true }}, 'sass-loader'])
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
	stats: {
		children: false  //to prevent double logs from sass lint
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new ExtractTextPlugin({ // define where to save the file
			filename: '[name].[hash].bundle.css',
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
