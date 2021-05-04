import React, { useEffect, useRef, useState } from 'react';
import {
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import config from '../../env';
import Accept from './accpet-js';
import { getImageUrl } from '../../utils/cloudinary';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Dialog from '@material-ui/core/Dialog';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link, navigate } from '@reach/router';
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_MY_ORDER } from '../../queries/orders';
import Loader from '../General/loader';
import useStyles from './styles';

//TODO: change this back to real value when we get the validation from
export enum AuthorizeNetScriptUrl {
  // Production = 'https://js.authorize.net/v1/Accept.js',
  Sandbox = 'https://jstest.authorize.net/v1/Accept.js',
  Production = 'https://jstest.authorize.net/v1/Accept.js',
}
interface CardSubmit {
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

function ccyFormat(num: number): string {
  return `${num.toFixed(2)}`;
}

const BillingForm = ({
  orderTotal,
  tax,
  shipping,
  total,
  discount,
}: {
  orderTotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount: string;
}): JSX.Element => {
  const submitRef = useRef<any>();
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [submitIt, { data, loading, error }] = useMutation(SUBMIT_MY_ORDER, {
    onCompleted: () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate('/');
      }, 3000);
    },
  });

  const iconSize = 60;
  const paymentIcons = [
    getImageUrl('printAndFrameIt/paymentIcons/visa_rmibl5.png', iconSize),
    getImageUrl('printAndFrameIt/paymentIcons/mastercard_qqvryx.png', iconSize),
    getImageUrl('printAndFrameIt/paymentIcons/paypal_jix16x.png', iconSize),
    getImageUrl('printAndFrameIt/paymentIcons/american-express_mgtkfx.png', iconSize),
  ];

  const classes = useStyles();
  const { t } = useTranslation('BillingComponent');
  const validationSchema = Yup.object({
    nameOnCard: Yup.string()
      .max(100, t('InputLength'))
      .required(),
    cardNumber: Yup.string()
      .matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
      )
      .required(),
    cvv: Yup.string()
      .matches(/^\d{3}\d?$/)
      .required(),
    expMonth: Yup.string().required(),
    expYear: Yup.string().required(),
  });
  const myDate = new Date();
  const currentYear = myDate.getFullYear();
  const years: number[] = [];
  for (let temp = currentYear; temp < currentYear + 6; temp++) {
    years.push(temp);
  }
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [acceptError, setAcceptError] = useState({ error: false, msg: '' });
  const renderIcons = (value: string, index: number): JSX.Element => {
    return <img src={value} alt="" key={index} style={{ margin: '5px' }} />;
  };
  useEffect(() => {
    const script = document.createElement('script');
    switch (process.env.NODE_ENV) {
      case 'production':
        script.src = AuthorizeNetScriptUrl.Production;
        break;
      case 'development':
        script.src = AuthorizeNetScriptUrl.Sandbox;
        break;
    }
    document.head.appendChild(script);
    return (): void => {
      const head = document.head;
      const scripts = head.getElementsByTagName('script');

      Array.from(scripts)
        .filter(
          script => script.src === AuthorizeNetScriptUrl.Production || script.src === AuthorizeNetScriptUrl.Sandbox,
        )
        .forEach(injectedScript => head.removeChild(injectedScript));
    };
  }, []);
  const onClickBuyNow = (): void => {
    submitRef.current ? submitRef.current.click() : null;
  };
  const handleClose = (): void => {
    setOpen(false);
    navigate('/');
  };
  const handleCloseAcceptError = (): void => {
    setAcceptError({ error: false, msg: '' });
  };
  const handleSubmit = async (data: CardSubmit): Promise<void> => {
    setProcessing(true);
    const authData = {
      apiLoginID: config.LOGIN_ID,
      clientKey: config.CLIENT_KEY,
    };

    const cardData = {
      cardCode: data.cvv,
      cardNumber: data.cardNumber,
      month: data.expMonth.toString().padStart(2, '0'),
      year: data.expYear,
      fullName: data.nameOnCard,
    };

    const secureData = { authData, cardData };
    try {
      const res = await Accept.dispatchData(secureData);
      // res.opaqueData.dataValue
      // console.log(JSON.stringify(res, null, 4));
      if (res.messages.resultCode !== 'Error') {
        submitIt({
          variables: {
            input: {
              authCode: res.opaqueData.dataValue,
            },
          },
        });
        setProcessing(false);
      }
    } catch (e) {
      setProcessing(false);
      setAcceptError({ error: true, msg: e.messages.message[0].text });
      console.log(e.messages);
    }
  };
  if (loading || processing) return <Loader />;
  return (
    <Grid container spacing={1} className={classes.mainContainer}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <h2 className={classes.mainHeading}>{t('ChoosePaymentMethod')}</h2>
        <Grid container spacing={1} className={classes.cardContainer}>
          <Grid item xs={12}>
            {paymentIcons.map(renderIcons)}
          </Grid>
          <h3>{t('PaymentSection.Title')}</h3>
          <Formik
            initialValues={{ nameOnCard: '', cardNumber: '', expMonth: '', expYear: '', cvv: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleBlur, handleChange, handleSubmit, errors }): JSX.Element => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid className={classes.labelAlign} item xs={12} sm={12} md={4} lg={6} xl={6}>
                    <InputLabel>{t('PaymentSection.Name')}</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                    <Field
                      name="nameOnCard"
                      variant="outlined"
                      placeholder={t('PaymentSection.NamePlaceHolder')}
                      fullWidth
                      as={TextField}
                      margin="dense"
                      error={!!errors.nameOnCard}
                    />
                  </Grid>
                  <Grid className={classes.labelAlign} item xs={12} sm={12} md={4} lg={6} xl={6}>
                    <InputLabel>{t('PaymentSection.CardNumber')}</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                    <Field
                      name="cardNumber"
                      fullWidth
                      as={TextField}
                      variant="outlined"
                      margin="dense"
                      placeholder={t('PaymentSection.CardNumberPlaceHolder')}
                      error={!!errors.cardNumber}
                    />
                  </Grid>
                  <Grid className={classes.labelAlign} item xs={12} sm={12} md={4} lg={6} xl={6}>
                    <InputLabel>{t('PaymentSection.ExpirationDate')}</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={3} xl={3} style={{ margin: '5px 0' }}>
                    <Select
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      value={values.expMonth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="expMonth"
                      error={!!errors.expMonth}
                    >
                      <MenuItem value="" selected>
                        {t('Select')}
                      </MenuItem>
                      {months.map(item => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={3} xl={3} style={{ margin: '5px 0' }}>
                    <Select
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      value={values.expYear}
                      onChange={handleChange}
                      name="expYear"
                      error={!!errors.expYear}
                    >
                      <MenuItem value="" selected>
                        {t('Select')}
                      </MenuItem>
                      {years.map(
                        (item): JSX.Element => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </Grid>
                  <Grid className={classes.labelAlign} item xs={12} sm={12} md={4} lg={6} xl={6}>
                    <InputLabel>{t('PaymentSection.VerificationNumber')}</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                    <Field
                      name="cvv"
                      fullWidth
                      as={TextField}
                      variant="outlined"
                      margin="dense"
                      placeholder="123"
                      error={!!errors.cvv}
                    />
                  </Grid>
                </Grid>
                <input type="submit" value="submit" ref={submitRef} hidden />
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}></Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.tipsContainer}>
        <Grid className={classes.subTotalContainer} item xs={12} container justify="center">
          <Grid container>
            <Grid item xs={6}>
              <p className={classes.subTotalLabel}>{t('SubTotal.Subtotal')}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalPrice}>
                {t('SubTotal.$')}
                {ccyFormat(total)}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalLabel}>{t('SubTotal.Discount')}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalPrice}>{discount}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalLabel}>{t('SubTotal.ShippingAndHandling')}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalPrice}>
                {t('SubTotal.$')}
                {ccyFormat(shipping)}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalLabel}>{t('SubTotal.Taxes')}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subTotalPrice}>
                {t('SubTotal.$')}
                {ccyFormat(tax)}
              </p>
            </Grid>
            <hr className={classes.subTotalHr} />
            <Grid item xs={6}>
              <h3 className={classes.subTotalLabel}>{t('SubTotal.TotalAmount')}</h3>
            </Grid>
            <Grid item xs={6}>
              <h3 className={classes.subTotalPrice}>
                {t('SubTotal.$')}
                {ccyFormat(orderTotal)}
              </h3>
            </Grid>
            <Button
              onClick={onClickBuyNow}
              variant="contained"
              type="submit"
              fullWidth
              className={`${classes.buyNow} ${classes.buttonEndIcon}`}
              endIcon={<ArrowForwardIosIcon />}
            >
              {t('SubTotal.BuyNow')}
            </Button>
            <Grid item xs={12}>
              <p className={classes.subTotalPrice}>
                {t('SubTotal.1')}
                <a href="#">{t('SubTotal.2')}</a>
                {t('SubTotal.3')}
                <a href="#">{t('SubTotal.4')}</a>
                {t('SubTotal.5')} <a href="#">{t('SubTotal.6')}</a>.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Grid container justify="center">
          <Grid item xs={10} md={12} lg={12}>
            <h2 className={classes.modalHeader}>{t('Dialog.Title')}</h2>
          </Grid>
          <Grid item xs={8} sm={6} md={6} lg={6}>
            <p className={classes.modalBodyText}>{t('Dialog.1')}</p>
            <p className={classes.modalBodyText}>{t('Dialog.2')}</p>
            <p className={classes.modalBottomText}>{t('Dialog.3')}</p>
            <div className={classes.socialIcons}>
              <Link to="#">
                <FacebookIcon className={classes.facebookIcon} />
              </Link>
              <Link to="#">
                <InstagramIcon className={classes.instagramIcon} />
              </Link>
              <Link to="#">
                <TwitterIcon className={classes.twitterIcon} />
              </Link>
            </div>
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        open={acceptError.error}
        onClose={handleCloseAcceptError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('PaymentError')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{acceptError.msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAcceptError} color="primary" autoFocus>
            {t('Agree')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BillingForm;
