import React from 'react';
import { Link } from '@reach/router';
import Main from '../layouts/Main';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FullPageTemplate from '../layouts/FullPageTemplate';
import PhotoDetail from '../components/PhotoDetails';
import FrameSelectorSection from '../components/small-components/FrameSelectorSection';
import HeroImage from '../components/HeroImage';
import { container, section } from './../assets/jss/material-kit-pro-react.js';

export const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    maxWidth: '830px',
    margin: '0 auto',
  },
  container,
  section: {
    ...section,
    padding: '15px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
  bannerContentArea: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    '& h2': {
      color: '#FABE69',
      fontSize: '80px',
      margin: 'auto 0',
      textTransform: 'uppercase',
      textShadow: '0 3px 6px #000000',
      letterSpacing: '0.05em',
      fontFamily: 'Gorgia',
      fontWeight: 100,
      [theme.breakpoints.down('sm')]: {
        fontSize: '40px',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  bannerLeftContent: {
    padding: '20px 30px',
    opacity: 0.8,
    maxWidth: 500,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
    '& h3': {
      textAlign: 'center',
      color: '#19295A',
      fontSize: '35px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '25px',
      },
    },
  },
  button: {
    width: '100%',
    background: '#19295A',
    color: '#FABE69',
    marginTop: '15px',
    height: '55px',
    '& a': {
      color: '#FABE69',
      textDecoration: 'none',
    },
  },
  title: {
    color: '#A9B800',
    fontFamily: 'Century Gothic Pro',
    margin: theme.spacing(4, 0, 2),
  },
  title3: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  topContent: {},
}));

const Prints = (): JSX.Element => {
  const { t } = useTranslation('PrintsPage');
  const classes = useStyles();

  return (
    <Main title="Prints" description="you upload and we print it" pageId="Prints">
      <FullPageTemplate>
        <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/people-vintage-photo-memories_fbxrup.jpg">
          <div className={classes.container} style={{ alignSelf: 'flex-end' }}>
            <div className={classes.bannerContentArea}>
              <h2>{t('Title')}</h2>
              <Paper className={classes.bannerLeftContent}>
                <h3>{t('BannerContentTitle')}</h3>
                <p>{t('ContentOne')}</p>
                <p>{t('ContentTwo')}</p>
                <p>{t('ContentThree')}</p>
                <Button variant="contained" color="primary" className={classes.button}>
                  <Link to="/uploader">{t('Button')}</Link>
                </Button>
              </Paper>
            </div>
          </div>
        </HeroImage>
        <PhotoDetail
          type="Prints"
          imageLink="https://res.cloudinary.com/dpvymgk1m/image/upload/v1580878089/printAndFrameIt/pexels-photo-265946_fp99mh.png"
        />
        <FrameSelectorSection />
        <Grid container className={classes.root} justify="center" direction="column" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h5" className={classes.title}>
              {t('PrintTitle')}
            </Typography>
            <p>
              {t('PrivacyContent')
                .split('\n')
                .reduce((r: any, c: any, x: any) => (r ? [...r, <br key={x} />, c] : [c]), null)}
            </p>
          </Grid>
        </Grid>
      </FullPageTemplate>
    </Main>
  );
};

export default Prints;
