import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid } from '@material-ui/core';
const useStyles = makeStyles({
  item: {
    padding: '20px',
  },
});
const EmptyCart = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('Cart');
  return (
    <Grid container justify="center" alignContent="center">
      <Grid item className={classes.item}>
        {t('EmptyCart')}
      </Grid>
    </Grid>
  );
};
export default EmptyCart;
