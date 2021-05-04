import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSignInWithFacebook, useSignInWithGoogle } from '../../containers/firebase/auth';

const useStyles = makeStyles(() =>
  createStyles({
    socialIcons: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      '& img': {
        width: '40px',
      },
    },
  }),
);

const SocialIcons = (): JSX.Element => {
  const classes = useStyles();
  const signInWithFacebook = useSignInWithFacebook();
  const signInWithGoogle = useSignInWithGoogle();

  return (
    <div className={classes.socialIcons}>
      <Button onClick={(): void => signInWithFacebook()}>
        <img
          src="https://res.cloudinary.com/dpvymgk1m/image/upload/v1578971858/printAndFrameIt/fb_okuz0m.png"
          alt="Facebook"
        />
      </Button>
      <Button onClick={(): void => signInWithGoogle()}>
        <img
          src="https://res.cloudinary.com/dpvymgk1m/image/upload/v1578971858/printAndFrameIt/go_hv3yzw.png"
          alt="Google"
        />
      </Button>
    </div>
  );
};

export default SocialIcons;
