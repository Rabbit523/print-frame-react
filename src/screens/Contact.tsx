import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ContactForm from '../components/contact-form';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#FFF',
      flexGrow: 1,
      marginTop: 20,
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    bottomLogo: {
      backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/bottomImg_sn3cnx.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 140%',
      backgroundPosition: '-50px 0px',
      overflow: 'hidden',
    },
  }),
);

const Contact = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Hidden only={['xs']}>
        <Grid item lg={5} className={classes.bottomLogo}></Grid>
      </Hidden>
      <Grid item md={12} lg={7} xs={12}>
        <ContactForm />
      </Grid>
    </Grid>
  );
};

export default Contact;
