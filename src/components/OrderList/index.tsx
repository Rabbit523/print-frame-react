import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { Link } from '@reach/router';
import { GET_MY_PRODUCTS } from '../../queries/orders';
import Loader from '../General/loader';
import * as Sentry from '@sentry/browser';
import { Order } from '../../utils/utils';
const useStyles = makeStyles(theme => {
  return {
    boxContainer: {
      border: '#a9a9a9 solid 1px',
      margin: 'auto',
    },
    titleContainer: {
      margin: 'auto',
    },
    titleText: {
      fontSize: 35,
      fontFamily: 'serif',
      margin: '0px 0px',
    },
    navigationTitle: {
      color: '#5F712A',
    },
    orderTitle: {
      color: '#9FB10D',
      marginTop: -30,
      paddingBottom: 30,
      [theme.breakpoints.down('sm')]: {
        marginTop: 'unset',
        paddingBottom: 'unset',
        paddingTop: 20,
      },
    },
    bodyTitle: {
      fontSize: 25,
      fontFamily: 'serif',
      margin: '0px 0px',
      color: '#FEB55F',
      padding: 15,
    },
    bodyText: {
      fontSize: 15,
      fontFamily: 'serif',
      color: '#19295A',
      width: '100%',
      margin: 'auto',
      padding: '10px 0',
    },
    bodyATag: {
      fontSize: 15,
      fontFamily: 'serif',
      margin: '0px 0px',
      color: 'grey',
      float: 'right',
      textDecoration: 'initial',
    },
    orderText: {
      fontSize: 25,
    },
    accountHr: {
      width: '95%',
      borderColor: 'grey',
      marginBottom: 0,
    },
    accountBody: {
      width: '95%',
      margin: 'auto',
      borderTop: '#F9F9F9 solid 5px',
      padding: 10,
    },
    orderBody: {
      border: 'none',
    },
    preHeader: {
      fontSize: 40,
      fontFamily: 'serif',
      margin: '0px 0px',
      borderBottom: '#F9F9F9 solid 5px',
      textAlign: 'center',
    },
    wholeBoxContainer: {
      padding: '100px 0px 50px 0',
      flexGrow: 1,
    },
    marginAuto: {
      margin: 'auto',
    },
  };
});

const OrderList = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('OrderList');
  const { data: OrderData, loading, error } = useQuery(GET_MY_PRODUCTS);
  if (loading) return <Loader />;
  const orders: Order[] = [];
  if (OrderData) {
    // OrderData.getMyOrders.forEach((e: Order) => {
    //   orders.push({ ...e, createdAt: moment(parseInt(e.createdAt)).format('MM/DD/YYYY') });
    // });
  }
  if (error) Sentry.captureException(error);
  return (
    <Grid className={classes.wholeBoxContainer} container justify="center">
      <Grid item md={5} xs={12}>
        <Grid className={classes.titleContainer} item md={6} xs={10}>
          <p className={`${classes.titleText} ${classes.navigationTitle}`}>{t('Navigation')}</p>
        </Grid>
        <Grid className={classes.boxContainer} item md={6} xs={10}>
          <p className={classes.bodyTitle}>{t('Account')}</p>
          <hr className={classes.accountHr} />
          <Grid className={classes.accountBody} container>
            <p className={classes.bodyText}>
              {t('Cart')}
              <Link className={classes.bodyATag} to="/cart">
                {t('View')}
              </Link>
            </p>
            <p className={classes.bodyText}>
              {t('Profile')}
              <Link className={classes.bodyATag} to="#">
                {t('View')}
              </Link>
            </p>
            <p className={classes.bodyText}>
              {t('History')}
              <Link className={classes.bodyATag} to="#">
                {t('View')}
              </Link>
            </p>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={7} xs={12}>
        <Grid className={classes.titleContainer} item md={6} xs={10}>
          <p className={`${classes.titleText} ${classes.orderTitle}`}>{t('Order')}</p>
        </Grid>
        <Grid className={classes.boxContainer} item md={8} xs={10}>
          <p className={classes.bodyTitle}>{t('Number')}</p>
          <Grid className={`${classes.accountBody} ${classes.orderBody}`} container>
            {orders.map(order => (
              <p className={`${classes.bodyText} ${classes.orderText}`} key={order.orderId}>
                {order.orderId}
                <a className={`${classes.bodyATag} ${classes.orderText}`} href="#">
                  {t('View')}
                </a>
              </p>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderList;
