/* eslint-disable @typescript-eslint/camelcase */
import cloudinary from 'cloudinary-core';
import config from '../env';
export const getImageUrl = (id, width = 456) => {
  const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: config.CLOUDINARY_NAME, secure: true });
  const url = cloudinaryCore.url(id, { width, crop: 'scale', quality: 'auto', fetchFormat: 'auto' });
  return url;
};
export const cloudinaryCtx = new cloudinary.Cloudinary({ cloud_name: config.CLOUDINARY_NAME, secure: true });
