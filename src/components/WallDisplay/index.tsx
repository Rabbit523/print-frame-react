import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../PhotoDetails';
import { navigate } from '@reach/router';
import { getImageUrl } from '../../utils/cloudinary';

const WallDisplay = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('WallDisplay');

  const onEditWallArt = (wallArtType: string): void => {
    navigate('wall-art/' + wallArtType);
  };
  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Grid item sm={12} className={classes.topContent}>
        <h2 className={classes.heading}>{t('Title')}</h2>
        <p className={classes.paragraph}>{t('Content')}</p>
      </Grid>
      <Grid container spacing={2} className={classes.imageContainer}>
        <Grid item sm={12} className={classes.wallArt} onClick={(): void => onEditWallArt('Family')}>
          <img src={`${getImageUrl('/printAndFrameIt/da_bdxzb_2x_kwxizw.png')}`} alt="" className={classes.image} />
        </Grid>
        <Grid item sm={12} className={classes.wallArt} onClick={(): void => onEditWallArt('Trio')}>
          <img src={`${getImageUrl('/printAndFrameIt/erfbvadfa_2x_hd0hsl.png')}`} alt="" className={classes.image} />
        </Grid>
        <Grid item sm={12} className={classes.wallArt} onClick={(): void => onEditWallArt('Capture Four')}>
          <img src={`${getImageUrl('/printAndFrameIt/EDRFVGASEDFB_2x_et9pra.png')}`} alt="" className={classes.image} />
        </Grid>
        <Grid item sm={12} className={classes.wallArt}>
          <img
            src={`${getImageUrl('/printAndFrameIt/FZSGBSZXRDFGBX_2x_v0bv8b.png')}`}
            alt=""
            className={classes.image}
          />
        </Grid>
      </Grid>
      <Grid item sm={12} className={classes.topContent}>
        <h2 className={classes.heading}>{t('Title1')}</h2>
        <p className={classes.paragraph}>{t('Content1')}</p>
      </Grid>
    </Grid>
  );
};

export default WallDisplay;
