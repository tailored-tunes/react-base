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
    test: /aws\.js$/,
    use: [{
      loader: 'string-replace-loader',
      query: {
        multiple: [
          {search: '__COGNITO_ARN__', replace: config.get('AWS.Cognito.arn')},
          {search: '__COGNITO_CLIENT_ID__', replace: config.get('AWS.Cognito.clientId')},
          {search: '__COGNITO_USER_POOL_ID__', replace: config.get('AWS.Cognito.userPoolId')},
          {search: '__COGNITO_IDENTITY_POOL_ID__', replace: config.get('AWS.Cognito.identityPoolId')},
          {search: '__AWS_REGION__', replace: config.get('AWS.region')},
          {search: '__DYNAMO_TABLE__', replace: config.get('AWS.Dynamo.table')}
        ]
      }
    }]
  }
]);

export default productionLoaders;
