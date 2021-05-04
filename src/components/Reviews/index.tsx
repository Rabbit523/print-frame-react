import React from 'react';
import { reviews } from './dummy';
import ReviewsComponent from './review';

const props = { reviews };

export const Reviews = () => {
  return <ReviewsComponent {...props} />;
};
