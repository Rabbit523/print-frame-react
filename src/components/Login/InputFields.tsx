import React from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import User from '@material-ui/icons/Person';
import Passowrd from '@material-ui/icons/Lock';

type LoginProps = {
  placeholder: string;
  icon: any;
};

type ImageProps = {
  icon: string;
};

type Login = {
  isOpen: boolean;
  login: LoginProps[];
  images: ImageProps[];
  action?: string | undefined;
  onClose: Function;
};

const useStyles = makeStyles(() =>
  createStyles({
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

const InputFields = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <div className={classes.inputContainer}>
        <TextField
          fullWidth={true}
          placeholder="Email or User Name"
          margin="normal"
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
  );
};

export default InputFields;
