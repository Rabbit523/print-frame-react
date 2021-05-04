import React from 'react';
import CountDown from './count-down';
import { makeStyles } from '@material-ui/core/styles';

type BannerProps = {
  title: string;
};

const useStyles = makeStyles(theme => {
  return {
    banner: {
      background: '#da3725',
      padding: '10px',
      color: 'white',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-around',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    offers: {
      width: '70%',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '5px',
      },
    },
    time: {
      width: '30%',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  };
});

const RedBanner = (props: BannerProps) => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <div className={classes.offers}>{props.title}</div>
      <div className={classes.time}>
        <CountDown />
      </div>
    </div>
  );
};

export default RedBanner;
