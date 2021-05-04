import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    textContainer: {
      color: '#5b668a',
      textAlign: 'center',
      width: '80%',
      margin: 'auto',
    },
  }),
);

const Features = (): JSX.Element => {
  const { t } = useTranslation('HomeQuality');
  const classes = useStyles();
  return (
    <Grid container className={classes.textContainer}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2>{t('BrilliantPhoto')}</h2>
        <p>{t('BrilliantPhotoText')}</p>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2>{t('BestMaterials')}</h2>
        <p>{t('BestMaterialsText')}</p>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2>{t('SatisfactionGuaranteed')}</h2>
        <p>{t('SatisfactionGuaranteedText')}</p>
      </Grid>
    </Grid>
  );
};

export default Features;
