import React from 'react';
import { Reviews } from '../components/Reviews';
import SalesTable from '../components/SalesTable';
import ContactForm from '../components/contact-form';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import ProcessSection from '../components/Home/ProcessSection';
import PaymentMethodComponent from '../components/PaymentMethods';

interface WrapperChildren {
  children: React.ReactNode | [React.ReactNode];
}
const Wrapper = ({ children }: WrapperChildren): JSX.Element => (
  <>
    {children}
    <Grid
      container
      style={{
        justifyContent: 'center',
        marginBottom: '100px',
      }}
    >
      <Grid item xs={8}>
        <ProcessSection />
      </Grid>
    </Grid>
    <SalesTable />
    <Reviews />
    <PaymentMethodComponent />
    <Grid container>
      <Hidden only={['xs']}>
        <Grid
          item
          md={5}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/bottomImg_sn3cnx.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '110% 140%',
            backgroundPosition: '-50px 0px',
            overflow: 'hidden',
          }}
        ></Grid>
      </Hidden>
      <Grid item xs={12} md={7}>
        <ContactForm />
      </Grid>
    </Grid>
  </>
);

export default Wrapper;
