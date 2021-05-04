import React, { useEffect, useState, Fragment } from 'react';
import Main from '../layouts/Main';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
import { useMutation } from '@apollo/react-hooks';
import { FORGOT_LOGIN } from '../queries/forgotLogin';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { auth } from '../containers/firebase/auth';

const useStyles = makeStyles(theme => ({
  forgotPassword: {
    textAlign: 'center',
    maxWidth: '630px',
    margin: '50px auto',
    border: '1px solid #cccccc',
    padding: '50px 0',
    borderRadius: '3px',
  },
  title: {
    color: '#A9B800',
    margin: theme.spacing(4, 0, 2),
  },
  text: {
    margin: theme.spacing(4, 0, 2),
    textAlign: 'left',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'inherit',
  },
  fieldWrapper: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: '#082A4C',
    width: '100%',
    padding: '10px 0',
  },
  loginLink: {
    color: '#A9B800',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    textAlign: 'right',
    display: 'block',
    paddingTop: '7px',
    textDecoration: 'none',
    fontSize: '16px',
  },
}));

const ForgotPassword = (): JSX.Element => {
  const { t } = useTranslation('ForgotPassword');
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [errorState, setErrorState] = useState('');
  const [successState, setSuccessState] = useState(false);

  const [sendFrom, { data, loading, error }] = useMutation(FORGOT_LOGIN);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
  });

  useEffect(() => {
    if (!loading && data) {
      setErrorState('false');
    }
    if (!loading && error) {
      setErrorState('true');
    }
  }, [loading]);

  const handleRecoverPasswordSubmission = (email: string) => {
    auth.sendPasswordResetEmail(email).then(res => {
      setSuccessState(true);
    });
  };

  const ForgotPasswordForm = (): JSX.Element => {
    return (
      <>
        <Typography variant="h4" className={classes.title}>
          {t('Title')}
        </Typography>
        <Typography className={classes.text}>{t('Text')}</Typography>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }): Promise<void> => {
            setSubmitting(true);
            sendFrom({ variables: { input: data } });
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleBlur, handleChange, handleSubmit, errors }): JSX.Element => (
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.fieldWrapper}>
                <Field
                  value={email}
                  name="email"
                  as={TextField}
                  type="input"
                  margin="normal"
                  className={classes.textField}
                  placeholder={t('Email')}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail((event.target as HTMLInputElement).value)
                  }
                />
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(): void => handleRecoverPasswordSubmission(email)}
              >
                {t('ResetPassword')}
              </Button>
            </form>
          )}
        </Formik>
      </>
    );
  };

  const ForgotSuccess = (): JSX.Element => {
    return (
      <div>
        <h3>{t('ForgotSuccess')}</h3>
      </div>
    );
  };

  return (
    <Main title="Prints" description="you upload and we print it" pageId="TermsAndConditions">
      <FullPageTemplate>
        <>
          <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/people-vintage-photo-memories_fbxrup.jpg">
            <Grid item md={5}>
              <div></div>
            </Grid>
          </HeroImage>
          <Grid container className={classes.forgotPassword} justify="center" alignItems="center">
            <Grid item xs={12} sm={8}>
              {successState && <ForgotSuccess />}
              {!successState && <ForgotPasswordForm />}
              <Link to="/login" className={classes.loginLink}>
                {t('LoginLink')}
              </Link>
            </Grid>
          </Grid>
        </>
      </FullPageTemplate>
    </Main>
  );
};

export default ForgotPassword;
