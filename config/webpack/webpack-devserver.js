import devServerConfig from './development/devServer';
import * as constants from './constants';

const devServer = (environment) => {
  let webpackConfig = {};

  if (environment === constants.DEVELOPMENT_ENVIRONMENT) {
    webpackConfig = Object.assign({}, webpackConfig, devServerConfig);
  }

  return webpackConfig;
};

export default devServer;
