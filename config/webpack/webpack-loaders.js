import productionLoadersConfig from './production/loaders';
import developmentLoadersConfig from './development/loaders';

import productionPostcssConfig from './production/postcss';
import developmentPostcssConfig from './development/postcss';

import * as constants from './constants';

const postCssConfig = (environment) => {
  if (environment === constants.DEVELOPMENT_ENVIRONMENT) {
    return developmentPostcssConfig;
  }

  return productionPostcssConfig;
};

const loaders = (environment, config, assetDir) => {
  const postCss = postCssConfig(environment);

  let webpackConfig = {
    module: {
      rules: productionLoadersConfig(config, postCssConfig, assetDir)
    }
  };

  if (environment === constants.DEVELOPMENT_ENVIRONMENT) {
    webpackConfig = {
      module: {
        rules: developmentLoadersConfig(config, postCss, assetDir).concat(productionLoadersConfig(config, postCss, assetDir))
      }
    };
  }

  return webpackConfig;
};

export default loaders;
