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
      fontFamily: 'Century Gothic Pro',
    },
    paragraph: {
      textAlign: 'center',
      margin: 'auto',
      padding: '10px',
      fontFamily: 'Century Gothic Pro',
      fontSize: 25,
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    button: {
      background: '#19295A',
      width: '280px',
      borderRadius: '0',
      fontFamily: 'Century Gothic Pro',
      '& a': {
        color: '#FABE69',
        textDecoration: 'none',
      },
    },
  };
});

const FrameSelectorSection = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('FrameSelectorSection');
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.content}>
        <h2 className={classes.heading}>{t('DontHaveFrame')}</h2>
        <p className={classes.paragraph}>{t('Discounttaka')}</p>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Button variant="contained" color="primary" className={classes.button}>
          <Link to="/frames">{t('Button')}</Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default FrameSelectorSection;
