import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../PhotoDetails';

const CheckFrameChoices = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('CheckFrameChoices');
  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Grid item sm={12} className={classes.topContent}>
        <h2 className={classes.heading}>{t('Title')}</h2>
        <p className={classes.paragraph}>{t('Content')}</p>
      </Grid>
      <Grid container spacing={2} className={classes.imageContainer}>
        <Grid item sm={12}>
          <img
            src={
              'https://res.cloudinary.com/dpvymgk1m/image/upload/v1582415054/printAndFrameIt/cjhgcgj_c_jmvghj_2x_hlelnf.png'
            }
            alt=""
            className={classes.image}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckFrameChoices;
