/* eslint-disable no-param-reassign */

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
  domain: 'https://theninja.blog',
  postDir: 'content/posts/',
  outputDir: 'content/images/'
};

module.exports = function(api, passedOptions) {
  const options = { ...defaultOptions, ...passedOptions }; // existing keys will be overriden

  api.onCreateNode(node => {
    if (node.internal.typeName === options.typeName) {
      console.info('Generating cover images');

      const splitPath = node.path.split('/'); // remove slash(/) from path string

      const imgName = splitPath[splitPath.length - 2]; // second to last item in array is the title slug, last is empty string

      createImage({
        output: `${options.outputDir}/${imgName}.png`,
        html: generateHtml(node.title, options)
      })
        .then(() => console.info(`Generated image for ${node.title}`))
        .catch(err => console.error(err));

      const coverImagePath = path.relative(options.postDir, options.outputDir);

      node.cover_image = coverImagePath.startsWith('.') ? `${coverImagePath}/${imgName}.png` : `./${coverImagePath}/${imgName}.png`; // use relative path
    }

    return node;
  });
};

// TODO fix images to appended to MD files directly
