import productionExternals from './production/externals';
import developmentExternals from './development/externals';
import * as constants from './constants';

const externals = (environment) => {
  const webpackConfig = {
    externals: productionExternals
  };
  if (environment === constants.DEVELOPMENT_ENVIRONMENT) {
    webpackConfig.externals = developmentExternals.concat(productionExternals);
  }

  return {...webpackConfig};
};

export default externals;
