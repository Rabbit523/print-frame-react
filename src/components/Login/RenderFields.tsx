import React from 'react';
import { TextField, Grid, makeStyles, InputAdornment } from '@material-ui/core';

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
  onClose: any;
};

const useStyles = makeStyles(() => {
  return {
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
  };
});

const RenderFields = (value: LoginProps, index: number) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <div className={classes.inputContainer}>
        <TextField
          fullWidth={true}
          placeholder={value.placeholder}
          margin="normal"
          key={index}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <value.icon />
              </InputAdornment>
            ),
            classes: { input: classes['input'] },
          }}
        />
      </div>
    </Grid>
  );
};

export default RenderFields;
