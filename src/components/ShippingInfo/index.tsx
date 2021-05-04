import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, Grid, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import BillingForm from './BillingAddress';
import ShippingAddressForm from './ShippingAddress';
import TextureBg from '../General/TextureBg';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { SAVE_SHIPPING_ADDRESS } from '../../queries/shipping';
import { GET_MY_ADDRESS } from '../../queries/products';
import { CheckoutBreadcrumb, CheckoutSteps } from '../Bredcrumb';
import { navigate } from '@reach/router';
import Loader from '../General/loader';

const useStyles = makeStyles(() => {
  return {
    heading: {
      color: '#556818',
      fontWeight: 500,
      marginLeft: '20px',
    },
    addressContainer: {
      padding: '20px',
      marginLeft: '10px',
      marginRight: '10px',
      border: '1px solid #d9d9d9',
      backgroundColor: '#F9F9F9',
    },
    fieldsContainer: {
      padding: '20px',
      border: '1px solid #d9d9d9',
      backgroundColor: '#F9F9F9',
    },
    btn: {
      backgroundColor: '#082A4C',
      color: '#FABE69',
      padding: '10px 20px',
      outline: 0,
      fontSize: '16px',
      margin: '10px',
    },
  };
});
export interface AddressInput {
  firstName: string;
  lastName: string;
  email: string;
  salutation: string;
  street1: string;
  street2?: string;
  zipCode: string;
  city: string;
  state: string;
  cellPhone?: string;
  __typename?: string;
}

const ShippingForm = (): JSX.Element => {
  const { t } = useTranslation('ShippingForm');
  const [samAddress, setSameAddress] = useState(true);
  const [shippingAddress, setShippingAddress] = useState();
  const [billingAddress, setBillingAddress] = useState();
  const [address, setMyAddress] = useState();
  const classes = useStyles();
  const shippingSubmit = useRef<HTMLInputElement>(null);
  const billingSubmit = useRef<HTMLInputElement>(null);
  const myAddress = useQuery(GET_MY_ADDRESS);
  const [saveShipping, savingShipping] = useMutation(SAVE_SHIPPING_ADDRESS, {
    onCompleted: () => {
      navigate('/order-confirmation');
    },
  });
  const submitForms = (): void => {
    billingSubmit.current ? billingSubmit.current.click() : null;
    if (!samAddress) {
      shippingSubmit.current ? shippingSubmit.current.click() : null;
    }
  };
  const handleNext = (data: AddressInput, type: string): void => {
    if (!samAddress) {
      type === 'billing' && setBillingAddress(data);
      type === 'shipping' && setShippingAddress(data);
    } else {
      setBillingAddress(data);
      setShippingAddress(data);
    }
  };
  useEffect(() => {
    if (samAddress && shippingAddress) {
      const address = {
        name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
        street1: shippingAddress.street1,
        street2: shippingAddress.street2,
        zipCode: parseInt(shippingAddress.zipCode),
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: 'usa',
      };
      const input = {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        shippingAddress: address,
        billingAddress: address,
        cellPhone: shippingAddress.cellPhone,
        email: shippingAddress.email,
      };
      saveShipping({ variables: { input } });
    } else if (shippingAddress && billingAddress) {
      const street1 = {
        name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
        street1: shippingAddress.street1,
        street2: shippingAddress.street2,
        zipCode: parseInt(shippingAddress.zipCode),
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: 'usa',
      };
      const street2 = {
        name: billingAddress.firstName + ' ' + billingAddress.lastName,
        street1: billingAddress.street1,
        street2: billingAddress.street2,
        zipCode: parseInt(billingAddress.zipCode),
        city: billingAddress.city,
        state: billingAddress.state,
        country: 'usa',
      };
      const input = {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        shippingAddress: street1,
        billingAddress: street2,
        cellPhone: shippingAddress.cellPhone,
        email: shippingAddress.email,
      };
      saveShipping({ variables: { input } });
    }
  }, [shippingAddress, billingAddress]);

  useEffect(() => {
    if (!myAddress.data || myAddress.error || myAddress.loading) return;
    setMyAddress(myAddress.data.getMyAddress);
  }, [myAddress.data]);

  if (savingShipping.loading || myAddress.loading) return <Loader />;

  return (
    <TextureBg>
      <>
        <CheckoutBreadcrumb activeStep={CheckoutSteps.addrress} />
        <h2 className={classes.heading}>{t('ShippingInformation')}</h2>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.fieldsContainer}>
              <h3>{t('BillingAddress')}</h3>
              <p>{t('PossibleBoxes')}</p>
              <BillingForm handleNext={handleNext} submitRef={billingSubmit} address={address} type="billing" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className={classes.addressContainer}>
              <h3>{t('DeliveryAddress')}</h3>
              <p>{t('PossibleBoxes')}</p>
              <RadioGroup
                value={samAddress ? 'billing address' : 'different addresses'}
                onChange={(): void => {
                  setSameAddress(!samAddress);
                }}
              >
                <FormControlLabel value="billing address" control={<Radio />} label={t('CorrespondsBillingAddress')} />
                <FormControlLabel
                  value="different addresses"
                  control={<Radio />}
                  label={t('ShipToDifferentAddresses')}
                />
              </RadioGroup>
              {!samAddress && (
                <ShippingAddressForm
                  handleNext={handleNext}
                  submitRef={shippingSubmit}
                  address={address}
                  type="shipping"
                />
              )}
            </div>
          </Grid>
          <Button type="submit" variant="contained" color="primary" onClick={submitForms} className={classes.btn}>
            {t('GetShippingRates')}
          </Button>
        </Grid>
      </>
    </TextureBg>
  );
};

export default ShippingForm;
