import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)',
      height: '30%',
      width: '50%',
      border: '1px solid #8080806b',
      marginBottom: '20px',
      paddingLeft: '1vw',
      paddingRight: '1vw',
      marginTop: '2vh',
      paddingTop: '1vh',
      paddingBottom: '1vh',
    },
    coupaninput: {
      width: '65%',
      height: '30px',
      marginLeft: '1vw',
    },
    applybutton: {
      marginLeft: '1vw',
      width: '30%',
      alignSelf: 'center',
      height: '30px',
    },
  }),
);

const ApplyDiscount = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.container}>
      <input type="text" name="LastName" placeholder="coupon code here" className={classes.coupaninput} />
      <input type="submit" value="Submit" className={classes.applybutton} />
    </Grid>
  );
};

export default ApplyDiscount;
