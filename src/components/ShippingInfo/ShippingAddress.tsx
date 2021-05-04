import React, { RefObject } from 'react';
import TextField from '@material-ui/core/TextField';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const emptyAddress = {
  firstName: '',
  lastName: '',
  email: '',
  salutation: '',
  street1: '',
  street2: '',
  zipCode: '',
  city: '',
  state: '',
  cellPhone: '',
};
export const statesArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];
//TODO:These forms can be abstracted . For now it is ok, but I have to revisit them to clean them up
const BlankForm = ({
  handleNext,
  submitRef,
  address,
  type,
}: {
  handleNext: Function;
  submitRef: RefObject<HTMLInputElement>;
  address: any;
  type: string;
}): JSX.Element => {
  const { t } = useTranslation('ShippingForm');
  var shippingAddress = emptyAddress;
  if (address && address.firstName) {
    shippingAddress = address.shippingAddress;
    shippingAddress.email = address.userEmail;
    shippingAddress.firstName = address.firstName;
    shippingAddress.lastName = address.lastName;
    shippingAddress.cellPhone = address.phoneNumber;
  }
  var billingAddress = emptyAddress;
  if (address && address.firstName) {
    billingAddress = address.billingAddress;
    billingAddress.email = address.userEmail;
    billingAddress.firstName = address.firstName;
    billingAddress.lastName = address.lastName;
    billingAddress.cellPhone = address.phoneNumber;
  }
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(50, t('InputLength'))
      .required(t('Required')),
    lastName: Yup.string()
      .max(50, t('InputLength'))
      .required(t('Required')),
    street1: Yup.string().required(t('Required')),
    city: Yup.string().required(t('Required')),
    state: Yup.string().required(t('Required')),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, t('FiveTo9Digit'))
      .required(t('Required')),
  });
  return (
    <Formik
      initialValues={type === 'shipping' ? shippingAddress : billingAddress}
      validationSchema={validationSchema}
      onSubmit={(data): void => {
        handleNext(data, type);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors }): JSX.Element => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('FirstName')}
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName}
              label={t('FirstName')}
              fullWidth={matches ? true : false}
            />
            <br />
            <Field
              name="lastName"
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('LastName')}
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName}
              label={t('LastName')}
              fullWidth={matches ? true : false}
            />
            <Field
              fullWidth
              name="street1"
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('Address1')}
              variant="outlined"
              error={!!errors.street1}
              helperText={errors.street1}
              label={t('Address1')}
            />
            <Field
              name="street2"
              fullWidth
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('Address2')}
              variant="outlined"
              error={!!errors.street2}
              helperText={errors.street2}
              label={t('Address2')}
            />
            <Field
              fullWidth
              name="city"
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('City')}
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city}
              label={t('City')}
            />
            <Field
              fullWidth
              name="zipCode"
              as={TextField}
              type="input"
              margin="normal"
              placeholder={t('ZipCode')}
              variant="outlined"
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              label={t('ZipCode')}
            />

            <Select
              placeholder={t('State')}
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              name="state"
              fullWidth
              error={!!errors.state}
            >
              {statesArray.map(state => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>

            <input type="submit" value="submit" ref={submitRef} hidden />
          </form>
        );
      }}
    </Formik>
  );
};

export default BlankForm;
