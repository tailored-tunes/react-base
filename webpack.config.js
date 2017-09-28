const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
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
		'./src/index.js'
	],
	output: {
		path: path.resolve('dist'),
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	devServer: {
		port: 3000,
		hot: true,
        overlay: {
            errors: true,
            warnings: true,
        }
	}
};
