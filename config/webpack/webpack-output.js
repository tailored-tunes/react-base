import filenameFor from './filenames';

const output = (NODE_ENV, buildPath) => {
  return {
    output: {
      path: buildPath,
      publicPath: '/',
      filename: filenameFor('output', NODE_ENV)
    }
  };
};

export default output;
