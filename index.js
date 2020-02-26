/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

const createImage = require('node-html-to-image');
const fs = require('fs-extra');
const generateHtml = require('./functions/generateHtml');
const cloudinaryService = require('./services/cloudinary');

const defaultOptions = {
  typeName: 'Post',
  coverField: 'cover_image',
  backgroundColors: ['#30475e', '#381460', '#ba6b57', '#21243d', '#434e52'],
  imgWidth: '700px',
  imgHeight: '650px',
  border: true,
  domain: 'https://theninja.blog',
  outputDir: 'content/images/',
  cloud_name: undefined,
  api_key: undefined,
  api_secret: undefined,
  upload_folder: 'blog_covers'
};

module.exports = function(api, passedOptions) {
  const options = { ...defaultOptions, ...passedOptions }; // existing keys will be overriden

  cloudinaryService.connect(options);

  api.onCreateNode(node => {
    if (node.internal.typeName === options.typeName && !node[options.coverField]) {
      console.info('Generating cover images');

      const splitPath = node.path.split('/'); // remove slash(/) from path string

      const imgName = splitPath[splitPath.length - 2]; // second to last item in array is the title slug, last is empty string

      fs.ensureDirSync(options.outputDir); // create output dir if it does not exist

      const output = `${options.outputDir}/${imgName}.png`;

      createImage({
        output,
        html: generateHtml(node.title, options)
      })
        .then(() => {
          console.info(`Generated image for ${node.title}`);
          cloudinaryService.upload(output, { use_filename: true, folder: options.upload_folder, eager: [{ quality: 80 }] }, function(error, result) {
            if (error) {
              console.error(error);
            } else {
              node[options.coverField] = result.secure_url;
            }
          });
        })
        .catch(err => console.error(err));
    }

    return node;
  });

  //  clean out images generated
  fs.emptyDir(options.outputDir)
    .then(() => console.log('Cleaned output directory'))
    .catch(err => console.error(err));
};

// TODO fix images to appended to MD files directly
