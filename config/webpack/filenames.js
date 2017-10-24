import devFilenames from './development/filenames';
import prodFilenames from './production/filenames';
import * as constants from './constants';

const filenameFor = (type, NODE_ENV) => {
  let names = {...prodFilenames};

  if (NODE_ENV === constants.DEVELOPMENT_ENVIRONMENT) {
    names = {...devFilenames};
  }

  if (!names.hasOwnProperty(type)) {
    throw new Error(`Tried to read "${type}" name config from "${NODE_ENV}" filename configurations but it doesn't exist`);
  }

  return names[type];

};

export default filenameFor;
