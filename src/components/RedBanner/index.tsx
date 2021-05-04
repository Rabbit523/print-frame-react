import React from 'react';
import { banner } from './dummy';
import RedBanner from './RedBanner';

export const BannerComponent = () => {
  return <RedBanner {...banner} />;
};
