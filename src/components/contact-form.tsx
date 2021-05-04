import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Hidden, Avatar } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { CONTACT_FORM_SUBMISSION } from '../queries/contactForm';
import Loader from './General/loader';
import SnackBar, { Variants } from './General/Snackbar';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { getImageUrl } from '../utils/cloudinary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      width: 'inherit',
    },
    buttonField: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: 10,
      width: 'inherit',
    },
    fieldWrapper: {
      width: '100%',
      '& input': {
        padding: '8.5px 14px',
      },
    },
    textAreaWrapper: {
      width: '100%',
      '& div div': {
        padding: '8.5px 14px',
      },
    },
    formControl: {
      padding: theme.spacing(1),
      minWidth: 120,
      width: '100%',
      '& div div': {
        padding: '8.5px 14px',
      },
      '& label': {
        transform: 'translate(14px, 18px) scale(1)',
        backgroundColor: 'white',
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px',
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    contactTitle: {
      flexGrow: 1,
      textAlign: 'center',
      color: '#19295A',
      paddingBottom: 20,
    },
    contactBody: {
      flexGrow: 1,
      textAlign: 'center',
      color: 'grey',
      fontSize: 13,
    },
  }),
);

const ContactForm = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('Contact');
  const [errorState, setErrorState] = useState('');

  const [sendFrom, { data, loading, error }] = useMutation(CONTACT_FORM_SUBMISSION);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, t('InputLength'))
      .required(t('Required')),
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
    message: Yup.string().required(),
    category: Yup.string().required(),
  });

  useEffect(() => {
    if (!loading && data) {
      setErrorState('false');
    }
    if (!loading && error) {
      setErrorState('true');
    }
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Formik
          initialValues={{ name: '', email: '', message: '', category: '' }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }): Promise<void> => {
            setSubmitting(true);
            sendFrom({ variables: { input: data } });
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleBlur, handleChange, handleSubmit, errors }): JSX.Element => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid item xs={12} sm={9}>
                <Typography variant="h4" className={classes.contactTitle}>
                  {t('WeAreHereToHelp')}
                </Typography>
                <Typography className={classes.contactBody}>{t('body1')}</Typography>
                <Typography className={classes.contactBody}>{t('body2')}</Typography>
                <Typography className={classes.contactBody}>{t('body3')}</Typography>
              </Grid>
              <div className={classes.fieldWrapper}>
                <Field
                  name="name"
                  as={TextField}
                  type="input"
                  margin="normal"
                  className={classes.textField}
                  placeholder={t('Name')}
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </div>
              <div className={classes.fieldWrapper}>
                <Field
                  name="email"
                  as={TextField}
                  type="input"
                  margin="normal"
                  className={classes.textField}
                  placeholder={t('Email')}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>{t('SelectACategory')}</InputLabel>
                <Select
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="category"
                  error={!!errors.category}
                >
                  <MenuItem value={t('Sales')}>{t('Sales')}</MenuItem>
                  <MenuItem value={t('Support')}>{t('Support')}</MenuItem>
                </Select>
              </FormControl>
              <div className={classes.textAreaWrapper}>
                <Field
                  name="message"
                  as={TextField}
                  type="input"
                  margin="normal"
                  className={classes.textField}
                  placeholder={t('QuestionsOrComments')}
                  variant="outlined"
                  rows="4"
                  label={t('QuestionsOrComments')}
                  multiline
                  error={!!errors.message}
                  helperText={errors.message}
                />
              </div>
              <div className={classes.buttonField}>
                <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                  {t('SendMyQuestion')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Grid>
      <Hidden only={['xs']}>
        <Grid item sm={6}>
          <div className={classes.avatarContainer}>
            <Avatar src={`${getImageUrl('printAndFrameIt/customer-care_epmsxt.jpg')}`} className={classes.avatar} />
          </div>
        </Grid>
      </Hidden>
      {errorState === 'true' && <SnackBar variant={Variants.error} message={t('ErrorMessage')} />}
      {errorState === 'false' && <SnackBar variant={Variants.success} message={t('SuccessMessage')} />}
    </Grid>
  );
};

export default ContactForm;
