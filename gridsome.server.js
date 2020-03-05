/* eslint-disable no-restricted-syntax */
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
  domain: 'https://awesomeblog.com',
  outputDir: 'content/images/',
  cloud_name: undefined,
  api_key: undefined,
  api_secret: undefined,
  upload_folder: 'blog_covers'
};

module.exports = function(api, passedOptions) {
  const options = { ...defaultOptions, ...passedOptions }; // existing keys will be overriden

  cloudinaryService.connect(options);

  api.loadSource(async actions => {
    const collection = actions.getCollection(options.typeName);

    collection.data().forEach(function(node) {
      if (node.internal.typeName === options.typeName && !node[options.coverField]) {
        console.info('Generating cover images');
        const splitPath = node.path.split('/'); // remove slash(/) from path string
        const imgName = splitPath[splitPath.length - 2]; // second to last item in array is the title slug, last is empty string
        fs.ensureDirSync(options.outputDir); // create output dir if it does not exist
        const output = `${options.outputDir}/${imgName}.png`;

        createImage({ output, html: generateHtml(node.title, options) })
          .then(function() {
            cloudinaryService.upload(output, { use_filename: true, unique_filename: false, folder: options.upload_folder, overwrite: false }, function(error, result) {
              if (error) {
                console.error(error);
              } else {
                collection.updateNode({ id: node.id, title: `${node.title}_updated`, [options.coverField]: result.secure_url });
              }
            });
          })
          .catch(err => console.log(err));
      }
    });

    //  clean out images generated
    fs.emptyDir(options.outputDir)
      .then(() => console.log('\nCleaned output directory'))
      .catch(err => console.error(err));
  });
};
