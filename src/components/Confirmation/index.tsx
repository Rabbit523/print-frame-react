import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import TextureBg from '../General/TextureBg';
import { navigate } from '@reach/router';
import { makeStyles, Grid } from '@material-ui/core';
import { GET_MY_ITEMS } from '../../queries/products';
import AddressInfo from './addressInfo';
import { CheckoutSteps, CheckoutBreadcrumb } from '../Bredcrumb';
import Loader from '../General/loader';
import CartItems from './cartItems';
import BillingComponent from '../BillingComponent';
const useStyles = makeStyles(() => {
  return {
    boxContainer: {
      border: '1px solid #d9d9d9',
      backgroundColor: '#F9F9F9',
      padding: 20,
    },
    preHeader: {
      fontSize: 40,
      fontFamily: 'Arial',
      margin: '0px 0px',
      paddingBottom: 20,
      borderBottom: '#F9F9F9 solid 5px',
    },
    wholeBoxContainer: {
      border: '1px solid #d9d9d9',
      padding: '50px 0px',
      flexGrow: 1,
    },
    '@media (max-width: 959px)': {
      maxWidth: '960px',
      preHeader: {
        fontSize: 25,
        textAign: 'center',
      },
    },
  };
});

const Confirmation = (): JSX.Element => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_MY_ITEMS);
  const { t } = useTranslation('Confirmation');
  const [orderTotal, setOrderTotal] = useState(0);
  const [tax, setTax] = useState(0);
  useEffect(() => {
    if (data) {
      const cartInfo = data.getMyOrderItems;

      let orderTotal = 0;
      if (cartInfo.DiscountCode) {
        if (cartInfo.discountCodeType === 'fix') {
          orderTotal = cartInfo.shippingPrice + (cartInfo.total - parseFloat(cartInfo.DiscountValue));
        } else {
          orderTotal = cartInfo.shippingPrice + (cartInfo.total - cartInfo.total * parseFloat(cartInfo.DiscountValue));
        }
      } else {
        orderTotal = cartInfo.shippingPrice + cartInfo.total;
      }
      if (cartInfo.shippingAddress.state == 'CA') {
        setOrderTotal(orderTotal + orderTotal * 0.08);
        setTax(orderTotal * 0.08);
      } else {
        setOrderTotal(orderTotal);
      }
    }
  }, [data]);
  if (loading) return <Loader />;
  if (error) navigate('/');

  const shippingAddress = { ...data.getMyOrderItems.shippingAddress, email: data.getMyOrderItems.email };
  const billingAddress = { ...data.getMyOrderItems.billingAddress, email: data.getMyOrderItems.email };
  const cartItems = [...data.getMyOrderItems.images, ...data.getMyOrderItems.frames];
  const wallArts = [...data.getMyOrderItems.wallArts];
  if (cartItems.length === 0 && wallArts.length === 0) navigate('/');
  return (
    <TextureBg>
      <CheckoutBreadcrumb activeStep={CheckoutSteps.conrimation} />
      <Grid className={classes.wholeBoxContainer} container justify="center" spacing={3}>
        <Grid item md={10} xs={12}>
          <pre className={classes.preHeader}>{t('CheckOrder')}</pre>
        </Grid>
        <Grid item md={5} xs={12}>
          <AddressInfo info={billingAddress} type={t('BillingAddress')} />
        </Grid>
        <Grid item md={5} xs={12}>
          <AddressInfo info={shippingAddress} type={t('DeliveryAddress')} />
        </Grid>
        <Grid item md={10} xs={12}>
          <CartItems items={cartItems} wallArts={wallArts} />
        </Grid>
        <Grid item xs={10}>
          <BillingComponent
            orderTotal={orderTotal}
            tax={tax}
            shipping={data.getMyOrderItems.shippingPrice}
            total={data.getMyOrderItems.total}
            discount={`${data.getMyOrderItems.discountCodeType === 'fix' ? '$' : '%'} ${
              data.getMyOrderItems.DiscountValue
            }`}
          />
        </Grid>
      </Grid>
    </TextureBg>
  );
};

export default Confirmation;
