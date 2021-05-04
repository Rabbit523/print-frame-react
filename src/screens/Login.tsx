import React, { useState, Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, TextField, Grid, InputAdornment, Paper } from '@material-ui/core';
import User from '@material-ui/icons/Person';
import Passowrd from '@material-ui/icons/Lock';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import Main from '../layouts/Main';
import HeroImage from './../components/HeroImage';
import SocialIcons from './../components/Login/SocialIcons';
import GoogleCaptcha from '../components/General/GoogleCaptcha';
import { auth } from './../containers/firebase/auth';
import { AuthContext } from '../containers/firebase/AuthProvider';

const styles = {
  media: {
    minHeight: '850px',
    backgroundPosition: '0 -500px',
    backgroundRepeat: 'no-repeat',
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      maxWidth: '830px',
      marginTop: '60px',
      marginBottom: '60px',
    },
    media: {
      minHeight: '850px',
      backgroundPosition: '0 -500px',
      backgroundRepeat: 'no-repeat',
    },
    paper: {
      minHeight: '400px',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    Title: {
      color: '#51660A',
    },
    uploadSection: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    signInBtn: {
      background: '#19295a',
      color: '#a9b927',
      marginTop: '20px',
      '&:hover': {
        background: '#19295a',
      },
      '& a': {
        color: '#a9b927',
        textDecoration: 'none',
      },
    },
    uploadBtn: {
      background: '#19295a',
      color: '#a9b927',
      '&:hover': {
        background: '#19295a',
      },
      '& a': {
        color: '#a9b927',
        textDecoration: 'none',
      },
    },
    heading: {
      textAlign: 'center',
      '& a': {
        color: '#a9b927',
        textDecoration: 'none',
      },
    },
    headings: {
      color: '#a9b927',
      textAlign: 'center',
      '& a': {
        color: '#a9b927',
        textDecoration: 'none',
      },
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      '&::placeholder': {
        color: 'orange',
      },
    },
  }),
);

const Login = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('LoginPage');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticated } = useContext(AuthContext);
  const handleFormSubmission = (email: string, password: string): void => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const loginFormContent = (): JSX.Element => {
    return (
      <Fragment>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className={classes.inputContainer}>
            <TextField
              fullWidth={true}
              placeholder="Email or User Name"
              margin="normal"
              onChange={e => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
                classes: { input: classes['input'] },
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              type="password"
              fullWidth={true}
              placeholder="Password"
              margin="normal"
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Passowrd />
                  </InputAdornment>
                ),
                classes: { input: classes['input'] },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            variant="contained"
            fullWidth={true}
            className={classes.signInBtn}
            onClick={(): void => handleFormSubmission(email, password)}
          >
            Sign In
          </Button>
          <p className={classes.headings}>
            <Link to="/forgot-password">{t('Login.ForgotPassword')}</Link>
          </p>
          <p className={classes.heading}>{t('GetQuickAccess')}</p>
          <SocialIcons />
        </Grid>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <GoogleCaptcha pageId="login" />
      <Main title="print and frame it" description="Login or Register" pageId="login">
        <HeroImage
          imageStyle={styles.media}
          headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/c_scale,h_1264,w_1920/v1577609510/printAndFrameIt/pexels-photo-2894275_ogdn2a.png"
        >
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h3 className={classes.Title}>{t('Login.Title')}</h3>
                  {authenticated ? <h4>{t('Login.AlreadyLoggedIn')}</h4> : loginFormContent()}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <h3 className={classes.Title}>{t('Register.Title')}</h3>
                  <List dense={true}>
                    <ListItem>
                      <ListItemIcon>
                        <LocalOfferIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('Register.List.one')} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('Register.List.two')} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FolderOpenIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('Register.List.three')} />
                    </ListItem>
                  </List>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button variant="contained" fullWidth={true} className={classes.signInBtn}>
                      <Link to="/register">{t('Register.register')}</Link>
                    </Button>
                    <p className={classes.heading}>{t('GetQuickAccess')}</p>
                    <SocialIcons />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.uploadSection}>
                  <p>{t('Register.NoTime')}</p>
                  <Button variant="contained" fullWidth={false} className={classes.uploadBtn}>
                    <Link to="/uploader">{t('Register.upload')}</Link>
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </HeroImage>
      </Main>
    </Fragment>
  );
};

export default Login;
