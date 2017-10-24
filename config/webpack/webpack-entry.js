import productionEntrySourcesConfig from './production/entry';
import developmentEntrySourcesConfig from './development/entry';
import * as constants from './constants';

const entrySources = (environment, srcPath) => {
  let webpackConfig = {
    entry: productionEntrySourcesConfig(srcPath)
  };

  if (environment === constants.DEVELOPMENT_ENVIRONMENT) {
    webpackConfig = {
      entry: developmentEntrySourcesConfig(srcPath).concat(productionEntrySourcesConfig(srcPath))
    };
  }

  return webpackConfig;
};

export default entrySources;
