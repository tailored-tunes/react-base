import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const postCssOptions = [
  autoprefixer({}),
  cssnano({})
];

export default postCssOptions;
