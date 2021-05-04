import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { useApolloClient } from '@apollo/react-hooks';
import { makeStyles, Paper, Button, Modal, TextField, Grid, InputAdornment } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloseIcon from '@material-ui/icons/HighlightOffOutlined';
import User from '@material-ui/icons/Person';
import Passowrd from '@material-ui/icons/Lock';
import SocialIcons from './SocialIcons';
import { auth, getAuthToken } from './../../containers/firebase/auth';

type Login = {
  isOpen: boolean;
  onClose: Function;
};

const useStyles = makeStyles(theme => {
  return {
    paperContainer: {
      position: 'relative',
      width: '300px',
      padding: '30px',
      margin: 'auto',
      marginTop: '10%',
      borderRadius: '10px',
      outline: 0,
      [theme.breakpoints.only('xs')]: {
        marginTop: '20%',
      },
    },
    signInBtn: {
      background: '#19295a',
      color: '#a9b927',
      marginTop: '20px',
      '&:hover': {
        background: '#19295a',
      },
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: '100%',
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      padding: '1rem',
      background: '#f9f9f9',
      opacity: 0.95,
      filter: 'alpha(opacity=50)',
    },
    loginContainer: {
      backgroundImage: 'linear-gradient(to right, #203e6d, #224a79, #255684, #29628f, #2d6e9a)',
      color: '#fabe68',
      textAlign: 'center',
      position: 'absolute',
      top: '-48px',
      width: '230px',
      padding: '20px',
      borderRadius: '10px',
    },
    iconContainer: {
      marginTop: '10px',
      color: 'white',
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CloseIcon: {
      position: 'absolute',
      fontSize: '30px',
      right: '-10px',
      top: '-13px',
    },
    heading: {
      textAlign: 'center',
    },
    socialIcons: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    headings: {
      color: '#a9b927',
      textAlign: 'center',
      '& a': {
        color: '#a9b927',
        textDecoration: 'none',
      },
    },
    headingContainer: {
      marginTop: '50px',
    },
    input: {
      '&::placeholder': {
        color: 'orange',
      },
    },
  };
});

const LoginModal = ({ isOpen, onClose }: Login): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const client = useApolloClient();
  const { t } = useTranslation('LoginModal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleClose = (): void => {
    setOpen(false);
    onClose();
  };
  const handleFormSubmission = (email: string, password: string): void => {
    auth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user) {
        getAuthToken().then(token => {
          localStorage.setItem('token', token);
        });
        client.writeData({ data: { isLoggedIn: true } });
        handleClose();
      }
    });
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Grid container>
      <Modal open={open} className={classes.modal}>
        <Paper className={classes.paperContainer}>
          <CloseIcon className={classes.CloseIcon} onClick={handleClose} />
          <div className={classes.loginContainer}>
            Login
            <div className={classes.iconContainer}>
              <InstagramIcon />
              <FacebookIcon />
              <TwitterIcon />
            </div>
          </div>
          <div className={classes.headingContainer}>
            <div className={classes.headings}>Not a member yet ?</div>
            <div className={classes.headings}>Sign Up</div>
          </div>
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
                onChange={e => setPassword(e.target.value)}
                fullWidth={true}
                placeholder="Password"
                margin="normal"
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
              onClick={(): void => handleFormSubmission(email, password)}
              variant="contained"
              fullWidth={true}
              className={classes.signInBtn}
            >
              {t('Login')}
            </Button>
            <p className={classes.headings}>
              <Link to="/forgot-password">{t('ForgotPassword')}</Link>
            </p>
            <p className={classes.heading}>{t('GetQuickAccess')}</p>
            <SocialIcons />
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default LoginModal;
