import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const productionLoaders = (config, postcssConfig, assetDir) => ([
  {test: /\.jsx?$/, use: ['babel-loader','eslint-loader'], exclude: /node_modules/},
  {
    test: /\.(sass|scss)$/,
    use: ExtractTextPlugin.extract(
      {
        use: [
          'css-loader',
          {loader: 'postcss-loader', options: {plugins: postcssConfig}},
          'sass-loader'
        ]
      }
    )
  },
  {
    test: /\.css$/,
    use: ['css-loader', 'style-loader']
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {loader: 'file-loader', options: {name:`${path.basename(assetDir)}/[name].[hash].[ext]`}}
    ]},
  {
    test: /\.jsx?$/,
    use: [{
      loader: 'string-replace-loader',
      query: {
        multiple: [
          {search: '__SOME_RUNTIME_VAR__', replace: config.get('example')},
        ]
      }
    }]
  }
]);

export default productionLoaders;
