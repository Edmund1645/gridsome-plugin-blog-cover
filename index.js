const path = require('path');
const createImage = require('node-html-to-image');
const generateHtml = require('./generateHtml');

const defaultOptions = {
  typeName: 'Post',
  coverField: 'cover_image',
  backgroundColors: ['#30475e', '#381460', '#ba6b57', '#21243d', '#434e52'],
  imgWidth: '700px',
  imgHeight: '650px',
  border: true,
  postDir: 'content/posts/',
  outputDir: 'content/images/'
};

const call = function(api, passedOptions) {
  const options = { ...defaultOptions, ...passedOptions };

  console.info('Generating cover images');
  createImage({
    output: `${options.outputDir}/test.png`,
    html: generateHtml('how to use eslint and prettier in your javascript applications', options)
  }).then(() => console.info(`Generated one image`));

  // existing keys will be overriden
  // api.onCreateNode(node => {
  //   if ((node.internal.typeName = options.typeName)) {

  //     const image =
  //   }
  // });
  // console.log(path.relative(options.postDir, options.outputDir));
  // console.log(options);
};

call('', { typeName: 'curry' });
