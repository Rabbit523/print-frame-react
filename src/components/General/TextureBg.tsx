import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { section } from '../../assets/jss/material-kit-pro-react.js';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  section: {
    ...section,
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/process_2x_cczfhd.jpg)`,
    padding: '70px 0px',
    backgroundRepeat: 'repeat',
    backgroundSize: '900px',
  },
  wrapper: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '15px',
    margin: '10px',
    [theme.breakpoints.up('md')]: {
      padding: '30px',
      margin: '20px',
    },
  },
}));

export default function ProcessSectionsBg({
  children,
}: {
  children: React.ReactNode | [React.ReactNode];
}): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container className={classes.section} justify="center">
      <Grid item xs={12} sm={12} md={9} className={classes.wrapper}>
        {children}
      </Grid>
    </Grid>
  );
}
