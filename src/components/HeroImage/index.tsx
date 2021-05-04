import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ServiceButtons from './ServicesButton';

interface HeroImageProps {
  headerImage: string;
  imageStyle?: Record<string, string>;
  children: JSX.Element | [JSX.Element];
}

const useStyles = makeStyles(theme => {
  return {
    header: {
      minHeight: '700px',
      height: '89vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      [theme.breakpoints.down('md')]: {
        backgroundPosition: 'unset',
      },
      [theme.breakpoints.down('xs')]: {
        height: 'auto',
      },
    },
  };
});

const HeroImage = ({ headerImage, children }: HeroImageProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.header}
      style={{ ...{ backgroundImage: `url(${headerImage})` } }}
    >
      {children}
      <div style={{ width: '100%', alignSelf: 'flex-end' }}>
        <ServiceButtons />
      </div>
    </Grid>
  );
};

export default HeroImage;
