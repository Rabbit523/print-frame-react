import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navigation = ({ classes, saveWallArt }: { classes: any; saveWallArt: Function }): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  return (
    <Grid container spacing={2} className={classes.checkoutButtonWrapper}>
      <Grid item xs={12} sm={6} md={9} lg={9} xl={9}></Grid>
      <Grid item xs={12} sm={6} md={3} lg={3} xl={3} className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.darkButton}
          fullWidth={true}
          onClick={(): void => {
            saveWallArt('/cart');
          }}
        >
          {t('CheckOut')}
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={(): void => {
            saveWallArt('/');
          }}
          fullWidth={true}
        >
          {t('ContinueShopping')}
        </Button>
      </Grid>
    </Grid>
  );
};
export default Navigation;
