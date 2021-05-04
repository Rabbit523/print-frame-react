import React from 'react';
import { Link } from '@reach/router';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';

const useStyles = makeStyles(theme => {
  return {
    container,
    section: {
      ...section,
      padding: '15px 0px',
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
    },
    root: {
      ...container,
      padding: '15px 0px',
      marginTop: '50px',
      marginBottom: '50px',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      textAlign: 'center',
    },
    wrapper: {
      marginTop: '50px',
      marginBottom: '50px',
    },
    content: {
      textAlign: 'center',
      '& p': {
        fontSize: '22px',
      },
    },
    heading: {
      color: '#60731e',
      fontSize: '35px',
    },
    button: {
      background: '#19295A',
      color: '#FABE69',
      width: '280px',
      borderRadius: '0',
      '& a': {
        color: '#FABE69',
        textDecoration: 'none',
      },
    },
  };
});

const PhotoUploader = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('PhotoDetail');
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.content}>
        <h2 className={classes.heading}>{t('DontHavePhoto')}</h2>
        <p>{t('Discounttaka')}</p>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Button variant="contained" color="primary" className={classes.button}>
          <Link to="/uploader">{t('Button')}</Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default PhotoUploader;
