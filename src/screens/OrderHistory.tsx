import React from 'react';
import Main from '../layouts/Main';
import ContactForm from '../components/contact-form';
import OrderList from '../components/OrderList';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
const styles = {
  bottomLogo: {
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/bottomImg_sn3cnx.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-80px 27px',
    overflow: 'hidden',
  },
};

const OrderHistory = (): JSX.Element => {
  return (
    <Main title="order-history" description="you upload and we print it" pageId="OrderHistory">
      <Grid container>
        <OrderList />
      </Grid>
      <Grid container>
        <Hidden only={['xs']}>
          <Grid item md={5} style={styles.bottomLogo}></Grid>
        </Hidden>
        <Grid item xs={12} md={5}>
          <ContactForm />
        </Grid>
      </Grid>
    </Main>
  );
};
export default OrderHistory;
