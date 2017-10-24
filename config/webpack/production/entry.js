import path from 'path';

const productionEntrySources = (srcPath) => ([
  path.join(srcPath, 'index.js'),
  path.join(srcPath, 'stylesheets/main.scss')
]);

export default productionEntrySources;
