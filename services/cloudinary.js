const cloudinary = require('cloudinary').v2;

module.exports = {
  connect(options) {
    if (options.cloud_name === undefined) {
      throw new Error('Cloudinary cloud name is required');
    } else if (options.api_key === undefined) {
      throw new Error('Cloudinary API key is required');
    } else if (options.api_secret === undefined) {
      throw new Error('Cloudinary API secret is required');
    } else {
      cloudinary.config({
        cloud_name: options.cloud_name,
        api_key: options.api_key,
        api_secret: options.api_secret
      });
    }
  },
  upload: cloudinary.uploader.upload
};
