import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { navigate } from '@reach/router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navigation = ({ classes, saveImage }: { classes: any; saveImage: Function }): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Grid container spacing={2} className={classes.checkoutButtonWrapper}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.frameIntro}>
          <p className={classes.textHeading}> {t('AddFrame')}</p>
          <p className={classes.paragraph}> {t('SaveFromOriginalPrice')}</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.darkButton}
            fullWidth={true}
            onClick={(): void => {
              saveImage('/image-editor');
            }}
          >
            {t('AddAnotherPhoto')}
          </Button>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={(): void => {
              saveImage('/');
            }}
            fullWidth={true}
          >
            {t('ContinueShopping')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.darkButton}
            fullWidth={true}
            onClick={(): void => {
              saveImage('/cart');
            }}
          >
            {t('CheckOut')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Navigation;
