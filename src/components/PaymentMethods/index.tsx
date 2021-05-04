import React from 'react';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { paymentmethods } from './icons';

type Payment = {
  icon: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      color: '#556818',
      textAlign: 'right',
      paddingRight: '10%',
      textShadow: '1px 1px 2px #8b9078, 1px 1px 2px #8b9078',
      marginTop: 70,
      fontSize: 55,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        paddingRight: 'unset',
        fontSize: 35,
      },
    },
    iconContainer: {
      width: '90%',
      padding: '20px',
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 50,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        margin: 'auto',
        float: 'none',
        width: '100%',
      },
    },
    paymentIcon: {
      width: '110px',
    },
    paymentContainer: {
      width: '128px',
    },
  }),
);

export const PaymentMethodComponent = (): JSX.Element => {
  const { t } = useTranslation('PaymentMethods');
  const classes = useStyles();
  const renderPaymentMethods = (value: Payment, index: number): JSX.Element => {
    return (
      <Grid className={classes.paymentContainer} key={index}>
        <img className={classes.paymentIcon} src={value.icon} alt="" />
      </Grid>
    );
  };

  return (
    <>
      <h2 className={classes.heading}>{t('Title')}</h2>
      <Grid container className={classes.iconContainer}>
        {paymentmethods.map(renderPaymentMethods)}
      </Grid>
    </>
  );
};

export default PaymentMethodComponent;
