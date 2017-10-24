import * as constants from './constants';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import filenameFor from './filenames';

import devPlugins from './development/plugins';
import prodPlugins from './production/plugins';

const plugins = (NODE_ENV, projectPath, buildPath, srcPath) => {

  const defaultPlugins = [

    //To extract css to its separate file
    new ExtractTextPlugin({
      filename: filenameFor('stylesheets', NODE_ENV),
      allChunks: true,
    }),

    //To clean the build path
    new CleanWebpackPlugin([buildPath], {root: projectPath}),

    //To set up the default environment variables
    new webpack.EnvironmentPlugin({
      NODE_ENV: constants.DEVELOPMENT_ENVIRONMENT
    }),

    //To extract vendors to their separate bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),

    //To extract webpack manifest so that our hashes will be deterministic
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest'}),

    //To specify a html template for the generated html
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: filenameFor('indexhtml', NODE_ENV),
      inject: 'body'
    }),

    //To defer the JS loads in the generated html
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    //To lint the scss files
    new StyleLintPlugin({})
  ];

  let finalPlugins = prodPlugins.concat(defaultPlugins);

  if (NODE_ENV === constants.DEVELOPMENT_ENVIRONMENT) {
    finalPlugins = devPlugins.concat(prodPlugins, defaultPlugins);
  }

  return {
    plugins: finalPlugins
  };
};

export default plugins;
