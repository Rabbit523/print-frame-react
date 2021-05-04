// import React, { useState, useEffect } from 'react';
// import {
//   makeStyles,
//   Grid,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   RadioProps,
// } from '@material-ui/core';
// import { useTranslation } from 'react-i18next';
// import Button from '@material-ui/core/Button';
// import TextureBg from './General/TextureBg';
// import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
// import { GET_SHIPPING_ADDRESS, GET_SHIPPING_RATES } from '../queries/shipping';
// import { CheckoutBreadcrumb, CheckoutSteps } from './Bredcrumb';
// import { navigate } from '@reach/router';
// import { GET_CART_ITEMS, CHANGE_SHIPPING_ID } from '../queries/products';
// import { CartItem, ItemType } from '../containers/resolvers';
// import Loader from './General/loader';
// import clsx from 'clsx';
// import { getImageUrl } from '../utils/cloudinary';

// const useStyles = makeStyles(() => {
//   return {
//     heading: {
//       color: '#556818',
//       fontWeight: 500,
//       marginLeft: '20px',
//     },
//     addressContainer: {
//       padding: '20px',
//       marginLeft: '10px',
//       marginRight: '10px',
//       border: '1px solid #d9d9d9',
//       backgroundColor: '#F9F9F9',
//     },
//     fieldsContainer: {
//       padding: '20px',
//       border: '1px solid #d9d9d9',
//       backgroundColor: '#F9F9F9',
//     },
//     btn: {
//       backgroundColor: '#082A4C',
//       color: '#FABE69',
//       padding: '10px 20px',
//       outline: 0,
//       fontSize: '16px',
//       margin: '10px',
//     },
//     root: {
//       '&:hover': {
//         backgroundColor: 'transparent',
//       },
//     },
//     icon: {
//       borderRadius: '50%',
//       width: 16,
//       height: 16,
//       boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
//       backgroundColor: '#f5f8fa',
//       backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//       '$root.Mui-focusVisible &': {
//         outline: '2px auto rgba(19,124,189,.6)',
//         outlineOffset: 2,
//       },
//       'input:hover ~ &': {
//         backgroundColor: '#ebf1f5',
//       },
//       'input:disabled ~ &': {
//         boxShadow: 'none',
//         background: 'rgba(206,217,224,.5)',
//       },
//     },
//     checkedIcon: {
//       backgroundColor: '#137cbd',
//       backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//       '&:before': {
//         display: 'block',
//         width: 16,
//         height: 16,
//         backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
//         content: '""',
//       },
//       'input:hover ~ &': {
//         backgroundColor: '#106ba3',
//       },
//     },
//     itemContainer: {
//       padding: '10px',
//       margin: '10px',
//       borderRadius: '5px',
//     },
//     containerError: {
//       border: 'solid 1px red',
//       borderRadius: '5px',
//     },
//   };
// });
// export interface AddressInput {
//   firstName: string;
//   lastName: string;
//   email: string;
//   salutation: string;
//   street1: string;
//   street2?: string;
//   zipCode: string;
//   city: string;
//   state: string;
//   cellPhone?: string;
// }
// interface ParcelInterface {
//   length: number;
//   width: number;
//   height: number;
//   weight: number;
//   id: string;
// }
// // Inspired by blueprintjs
// function StyledRadio(props: RadioProps): JSX.Element {
//   const classes = useStyles();

//   return (
//     <Radio
//       className={classes.root}
//       disableRipple
//       color="default"
//       checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
//       icon={<span className={classes.icon} />}
//       {...props}
//     />
//   );
// }

// const ShippingService = (): JSX.Element => {
//   const { t } = useTranslation('ShippingForm');
//   const classes = useStyles();
//   const { data: addressData } = useQuery(GET_SHIPPING_ADDRESS);
//   const { data: cartData } = useQuery(GET_CART_ITEMS);
//   const [cartItems, setCartItems] = useState();
//   const [setRate] = useMutation(CHANGE_SHIPPING_ID);
//   const [loadRates, { data, loading, error }] = useLazyQuery(GET_SHIPPING_RATES);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   if (!addressData || !cartData) navigate('shipping');

//   const { shippingAddress } = addressData;
//   const parcel: ParcelInterface[] = [];
//   useEffect(() => {
//     if (cartData) {
//       const tempItems = cartData.cartItems.map((item: CartItem) => {
//         item.shippingId = '';
//         return item;
//       });
//       tempItems.map((item: CartItem) => {
//         parcel.push({
//           length: item.shippingLength as number,
//           width: item.shippingWidth as number,
//           height: item.shippingHeight as number,
//           weight: item.shippingWeight as number,
//           id: item.id as string,
//         });
//       });
//       const input = {
//         address: {
//           name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
//           street1: shippingAddress.street1,
//           street2: shippingAddress.street2 ? shippingAddress.street2 : '',
//           zip: shippingAddress.zipCode,
//           city: shippingAddress.city,
//           state: shippingAddress.state,
//           country: 'usa',
//           phone: shippingAddress.cellPhone,
//         },
//         parcel,
//       };
//       loadRates({
//         variables: { input },
//       });
//       setCartItems(tempItems);
//       setDataLoading(false);
//     }
//   }, [cartData]);

//   const handleChange = (productId: string, shippingInfo: string): void => {
//     setRate({ variables: { input: { id: productId, shippingInfo } } });
//   };
//   const handleSubmit = (): void => {
//     setSubmitting(true);
//     let flag = true;
//     cartItems.map((item: CartItem) => {
//       if (item.shippingId === '') flag = false;
//     });
//     if (flag) {
//       navigate('/order-confirmation');
//     }
//   };

//   if (error) {
//     //TODO:sentry
//     return <div>Somting went wrong</div>;
//   }
//   if (loading || dataLoading) return <Loader />;
//   const { getRates } = data;
//   return (
//     <TextureBg>
//       <>
//         <CheckoutBreadcrumb activeStep={CheckoutSteps.shipping} />
//         <h2 className={classes.heading}>{t('ShippingInformation')}</h2>
//         <Grid container>
//           <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//             <div className={classes.fieldsContainer}>
//               {/* <pre>{JSON.stringify(cartItems, null, 4)}</pre>
//               <pre>{JSON.stringify(getRates, null, 4)}</pre> */}
//               {getRates.map((rate: any) => {
//                 const item: CartItem = cartItems.find((item: CartItem) => item.id == rate.id);

//                 return (
//                   <div
//                     key={item.id}
//                     className={`${classes.itemContainer} ${
//                       item.shippingId === '' && submitting ? classes.containerError : ''
//                     }`}
//                   >
//                     <img
//                       src={item.type === ItemType.FRAME ? getImageUrl(item.Thumbnail) : item.scaledImage}
//                       alt="frame"
//                       width={item.width * 5}
//                       height={item.height * 5}
//                       style={{ display: 'block' }}
//                     />

//                     <FormControl component="fieldset">
//                       <FormLabel component="legend">Select Rates</FormLabel>
//                       <RadioGroup
//                         aria-label="rates"
//                         name="customized-radios"
//                         value={item.shippingId}
//                         onChange={(e): void => handleChange(item.id as string, e.target.value)}
//                       >
//                         {rate.rates
//                           .slice(0)
//                           .reverse()
//                           .map((rt: any, index: number) => {
//                             if (index < 4) {
//                               return (
//                                 <FormControlLabel
//                                   key={rt.id}
//                                   control={
//                                     <StyledRadio
//                                       value={`${rt.id}-${(parseFloat(rt.rate) + 5).toFixed(2)}`}
//                                       checked={rt.id === item.shippingId}
//                                     />
//                                   }
//                                   label={`${rt.service.replace('_', ' ')}  $${(
//                                     (parseFloat(rt.rate) + 5) *
//                                     item.quantity
//                                   ).toFixed(2)}`}
//                                 />
//                               );
//                             }
//                           })}
//                       </RadioGroup>
//                     </FormControl>
//                   </div>
//                 );
//               })}
//             </div>
//           </Grid>
//         </Grid>
//         <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} className={classes.btn}>
//           {t('CreditCardInfo')}
//         </Button>
//       </>
//     </TextureBg>
//   );
// };

// export default ShippingService;
