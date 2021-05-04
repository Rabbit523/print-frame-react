import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { RatingComponent } from '../Rating/index';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

type ReviewsProps = {
  image: string;
  rating: number;
  reviews: string;
};

type ReviewsProp = {
  reviews: ReviewsProps[];
};

const useStyles = makeStyles(theme => {
  return {
    gridItems: {
      textAlign: 'center',
      padding: '10px',
      margin: '10px',
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px',
    },
    avatar: {
      width: '150px',
      height: '150px',
    },
    heading: {
      color: '#556818',
      textAlign: 'center',
      width: '100%',
      fontSize: 55,
      textShadow: '1px 1px 2px #8b9078, 1px 1px 2px #8b9078',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        paddingRight: 'unset',
        fontSize: 35,
      },
    },
  };
});

const renderReviews = (value: ReviewsProps, index: number) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
      <div className={classes.gridItems}>
        <div className={classes.avatarContainer}>
          <Avatar src={value.image} className={classes.avatar} />
        </div>
        <RatingComponent rating={value.rating} />
        <div>{value.reviews}</div>
      </div>
    </Grid>
  );
};

const ReviewsComponent = (props: ReviewsProp) => {
  const classes = useStyles();
  const { t } = useTranslation('ReviewSection');
  return (
    <>
      <h2 className={classes.heading}>{t('Title')}</h2>
      <Grid container justify="center" alignItems="center">
        {props.reviews.map(renderReviews)}
      </Grid>
    </>
  );
};

export default ReviewsComponent;
