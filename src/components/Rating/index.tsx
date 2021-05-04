import React from 'react';
import Rating from '@material-ui/lab/Rating';

type Props = {
  rating: number;
};

export const RatingComponent = (props: Props): JSX.Element => {
  const { rating } = props;
  return <Rating value={rating} name="read-only" />;
};
