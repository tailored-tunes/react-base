/******************************************** IMPORTS *********************************************/
import * as constants from './config/webpack/constants';
import * as logger from './config/webpack/logger';
import config from 'config';
import path from 'path';

import devServer from './config/webpack/webpack-devserver';
import entry from './config/webpack/webpack-entry';
import externals from './config/webpack/webpack-externals';
import loaders from './config/webpack/webpack-loaders';
import output from './config/webpack/webpack-output';
import plugins from './config/webpack/webpack-plugins';

/**************************************** DIRECTORY PATHS *****************************************/
// common paths
const projectPath = path.resolve(__dirname);
const srcPath = path.join(projectPath, './src');
const buildPath = path.join(projectPath, './dist');
const assetPath = path.join(buildPath, 'assets');
const libPaths = [path.join(projectPath, 'node_modules')];

/**************************************** ENVIRONMENT VARS ****************************************/
// Extract environment vars from process.env, with fallbacks if expected vars not present
const NODE_ENV = process.env.NODE_ENV || constants.DEVELOPMENT_ENVIRONMENT;
const TEST_ENV = process.env.TEST_ENV || false;

// Detect if verbose mode is active
const isVerbose = process.argv.indexOf('--verbose') > -1;

// SET THE BABEL ENVIRONMENT (for use under the hood in transpiling)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

/************************************** LOG THE ENVIRONMENT **************************************/
logger.logBoolFlag((NODE_ENV === constants.DEVELOPMENT_ENVIRONMENT), `Build environment: ${NODE_ENV}`);
logger.logBoolFlag(TEST_ENV, `Is testing environment: ${TEST_ENV}`);

if (typeof target !== 'undefined') {
  logger.log(`Babel target: ${TARGET}`);
}
logger.emptyLine();
logger.header('Paths:');
logger.important(
  `\tSources path:\t\t${srcPath}`,
  `\tLibraries path:\t\t${libPaths}`,
  `\tBuild output path:\t${buildPath}`,
  `\tAssets output path:\t${assetPath}`
);
logger.emptyLine();

const webpackConfiguration = Object.assign(
  {},
  devServer(NODE_ENV),
  entry(NODE_ENV, srcPath),
  externals(NODE_ENV),
  loaders(NODE_ENV, config, assetPath),
  output(NODE_ENV, buildPath),
  plugins(NODE_ENV, projectPath, buildPath, srcPath)
);

if (isVerbose === true) {
  logger.header(`Generated Webpack Configuration using ${NODE_ENV} templates`);
  logger.log('For more details, check the files in config/webpack');
  console.log(webpackConfiguration);
}

export default webpackConfiguration;
