import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Button, Modal } from '@material-ui/core';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloseIcon from '@material-ui/icons/HighlightOffOutlined';
import { useSignInWithGoogle, useSignInWithFacebook } from '../../containers/firebase/auth';
import { Image, Transformation } from 'cloudinary-react';

type ImageProps = {
  icon: string;
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

const loginPage = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const { t } = useTranslation();
  const signInWithGoogle = useSignInWithGoogle();
  const signInWithFacebook = useSignInWithFacebook();

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Modal open={open}>
        <Paper className={classes.paperContainer}>
          <Link to="/">
            <CloseIcon className={classes.CloseIcon} onClick={handleClose} />
          </Link>
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
            <Button variant="contained" fullWidth={true} className={classes.signInBtn}>
              Sign In
            </Button>
            <p className={classes.headings}>Forgot password</p>
            <p className={classes.heading}>{t('Get Quick Access With')}</p>
            <div className={classes.socialIcons}>
              <Button onClick={(): void => signInWithFacebook()}>
                <Image publicId="printAndFrameIt/go_hv3yzw.png" width="50">
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
              </Button>
              <Button onClick={(): void => signInWithGoogle()}>
                <Image publicId="printAndFrameIt/fb_okuz0m.png" width="50">
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
              </Button>
            </div>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default loginPage;
