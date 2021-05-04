import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Button, TextField, Select, FormControl } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PaymentMethods from '../PaymentMethods/PaymentMethodsCart';
import TextureBg from '../General/TextureBg';
import { CheckoutBreadcrumb, CheckoutSteps } from '../Bredcrumb';
import {
  GET_MY_ITEMS,
  REMOVE_MY_WALL_ART,
  REMOVE_MY_ORDER_ITEM,
  UPDATE_MY_ORDER_ITEM_QUANTITY,
  UPDATE_MY_WALL_ART_QUANTITY,
} from '../../queries/products';
import { IS_VALID_DISCOUNT_CODE } from '../../queries/discountCode';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getImageUrl } from '../../utils/cloudinary';
import IconButton from '@material-ui/core/IconButton';
import EmptyCart from './emptyCart';
import { navigate } from '@reach/router';
import Loader from '../General/loader';
import AlertDialog from './DiscountAlert';

const useStyles = makeStyles(theme => {
  return {
    cartContainer: {
      width: '100%',
      margin: 'auto',
      padding: '20px 0',
      borderBottom: '1px solid darkgrey',
    },
    wallArtContainer: {
      width: '100%',
      margin: 'auto',
      padding: '20px 0',
    },
    cartHeaderContainer: {
      width: '100%',
      margin: 'auto',
      paddingTop: 30,
      borderBottom: '1px solid darkgrey',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    totalContainer: {
      width: '80%',
      margin: 'auto',
      paddingBottom: 20,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    subtotalContainer: {
      marginTop: '20px',
      marginBottom: '10px',
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    applyCoupon: {
      margin: 0,
      marginRight: 10,
      '& input': {
        padding: '8.5px 14px',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '50%',
        margin: 0,
        marginRight: 10,
      },
    },
    image: {
      margin: 'auto',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
        padding: 10,
      },
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
    formControl: {
      width: 50,
      display: 'flex',
      '& div div': {
        fontSize: 15,
        textAlign: 'center',
        padding: 0,
        margin: 0,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        '& div div': {
          fontSize: 25,
          margin: 'auto',
          padding: '18px 14px',
        },
      },
    },
    textContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 'auto',
    },
    buttonsContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },

    editButton: {
      marginLeft: '10px',
      paddingLeft: '10px',
    },
    btn: {
      backgroundColor: '#082A4C',
      color: '#FABE69',
      borderRadius: 0,
      outline: 0,
      fontSize: '16px',
      margin: '10px',
    },
    table: {
      '& th': {
        borderBottom: 'none',
        paddingBottom: 20,
        paddingTop: 30,
      },
      '& thead tr th:first-child': {
        paddingLeft: 30,
      },
    },
    cartHeader: {
      width: '100%',
      textAlign: 'center',
      display: 'block',
      paddingBottom: 20,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    cartBody: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: 'unset',
        margin: 'auto',
        height: 'unset',
        display: 'block',
      },
    },
    cartDiv: {
      paddingTop: 10,
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        fontSize: 30,
      },
    },
    cartHidden: {
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    selectContainer: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    productContainer: {
      display: 'inline-block',
      textAlign: 'left',
      paddingLeft: 10,
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        marginLeft: 0,
        marginTop: 20,
      },
    },
    editAndAdd: {
      fontSize: 20,
      color: '#556818',
      padding: 0,
      paddingRight: 20,
    },
    buttons: {
      display: 'block',
    },
  };
});
const CartComponent = (): JSX.Element => {
  const { t } = useTranslation('Cart');
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const classes = useStyles();
  const [Total, setTotal] = useState(0);
  const [DiscountCode, setDiscountcode] = useState('');
  const cartItems = useQuery(GET_MY_ITEMS);
  const [isValidDiscountCode, discountCodeData] = useMutation(IS_VALID_DISCOUNT_CODE);
  const [removeItem, removingItem] = useMutation(REMOVE_MY_ORDER_ITEM, {
    onCompleted: () => {
      cartItems.refetch();
    },
    onError: () => {
      cartItems.refetch();
    },
  });

  const [removeWallArt, removingWallArt] = useMutation(REMOVE_MY_WALL_ART, {
    onCompleted: () => {
      cartItems.refetch();
    },
    onError: () => {
      cartItems.refetch();
    },
  });
  const [updateItemQuantity, updatingQuantity] = useMutation(UPDATE_MY_ORDER_ITEM_QUANTITY, {
    onCompleted: () => {
      cartItems.refetch();
    },
    onError: () => {
      cartItems.refetch();
    },
  });
  const [updateWallArtQuantity, updatingWallArtQuantity] = useMutation(UPDATE_MY_WALL_ART_QUANTITY, {
    onCompleted: () => {
      cartItems.refetch();
    },
    onError: () => {
      cartItems.refetch();
    },
  });

  const renderOptions = (value: number): JSX.Element => {
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  };
  const handleQuantityChange = (e: any, id: string, type: string): void => {
    updateItemQuantity({ variables: { input: { imageId: id, quantity: e.target.value, type } } });
  };
  const handleWallArtQuantityChange = (e: any, id: string): void => {
    updateWallArtQuantity({ variables: { input: { wallArtId: id, quantity: e.target.value } } });
  };
  const handleEditRequest = (id: string): void => {
    navigate(`/image-editor/${id}`);
  };
  const handleRemoveWallArt = (id: string): void => {
    removeWallArt({ variables: { input: { id: id } } });
  };
  const handleEditWallArt = (name: string, id: string): void => {
    navigate(`/wall-art/${name}/${id}`);
  };
  const calculateWidth = (width: number) => {
    return 40 + (60 / 20) * width;
  };
  const calculateHeight = (height: number) => {
    return 40 + (50 / 24) * height;
  };

  const discountCode = discountCodeData.data ? discountCodeData.data.isValidDiscountCode : null;
  useEffect(() => {
    if (discountCode) {
      if (discountCode.type === 'fix') {
        const total = Total - discountCode.value;
        setTotal(total);
      } else {
        const total = (Total * (100 - discountCode.value)) / 100;
        setTotal(total);
      }
    }
  }, [discountCodeData]);

  const Product = (value: any): JSX.Element => {
    return (
      <Grid container className={classes.cartContainer} key={value.id}>
        {discountCodeData.error ? <AlertDialog /> : null}
        <Grid item xs={12} md={2} className={classes.textContainer}>
          <Grid container>
            <div className={classes.cartBody}>
              <img
                src={value.thumbnail ? getImageUrl(value.thumbnail) : 'data:image/png;base64,' + value.finalImageData}
                alt="product"
                className={classes.image}
                width={value.thumbnail ? calculateWidth(value.width) : calculateWidth(value.printWidth)}
                // height={value.thumbnail ? calculateHeight(value.height) : calculateHeight(value.printHeight)}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className={classes.textContainer}>
          <Grid container>
            <div className={classes.cartBody}>
              <div className={classes.productContainer}>
                <div>
                  <b>{value.thumbnail ? 'Frame' : 'Image'}</b>
                </div>
                {value.thumbnail ? (
                  <div>{`Height: ${value.height}"   Width: ${value.width}"`}</div>
                ) : (
                  <div>{`Height: ${value.printHeight}"   Width: ${value.printWidth}"`}</div>
                )}
                <div className={classes.buttons}>
                  {!value.thumbnail && (
                    <IconButton
                      className={classes.editAndAdd}
                      onClick={(): void => handleEditRequest(value.name)}
                      aria-label="edit"
                      color="primary"
                    >
                      {t('Edit')}
                    </IconButton>
                  )}
                  <IconButton
                    className={classes.editAndAdd}
                    onClick={(): void => handleRemoveRequest(value.id as string, value.thumbnail ? 'Frame' : 'Image')}
                    aria-label="delete"
                    color="primary"
                  >
                    {t('Remove')}
                  </IconButton>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} className={`${classes.textContainer} ${classes.cartHidden}`}>
          <Grid container>
            <div className={classes.cartBody}>
              <div className={classes.cartDiv}>{value.price}</div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} className={classes.textContainer}>
          <Grid container className={classes.selectContainer}>
            <div className={classes.cartBody}>
              <div className={classes.cartDiv}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    name="quantity"
                    value={value.quantity}
                    defaultValue={value.quantity}
                    onChange={(e): void =>
                      handleQuantityChange(e, value.id as string, value.thumbnail ? 'frame' : 'image')
                    }
                  >
                    {options.map(renderOptions)}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} className={classes.textContainer}>
          <Grid container>
            <div className={classes.cartBody}>
              <div className={classes.cartDiv}>$ {value.quantity * value.price}</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const WallArt = (value: any): JSX.Element => {
    return (
      <Grid className={classes.cartContainer} key={value.id}>
        <Grid container className={classes.wallArtContainer}>
          <Grid item xs={12} md={2} container>
            <Grid container>
              <div className={classes.cartBody}>
                {value.name == 'Family' ? (
                  <img
                    src={`https://res.cloudinary.com/dpvymgk1m/image/upload/v1583464536/the-family_u5px3q.png`}
                    alt="frameImage"
                    className={classes.image}
                    width={calculateWidth(20)}
                    height={calculateHeight(24)}
                  />
                ) : null}
                {value.name == 'Trio' ? (
                  <img
                    src={`https://res.cloudinary.com/dpvymgk1m/image/upload/v1583464536/the-trio_uf09qh.png`}
                    alt="frameImage"
                    className={classes.image}
                    width={calculateWidth(20)}
                    height={calculateHeight(24)}
                  />
                ) : null}
                {value.name == 'Capture Four' ? (
                  <img
                    src={`https://res.cloudinary.com/dpvymgk1m/image/upload/v1583464534/capture-4_kempn3.png`}
                    alt="frameImage"
                    className={classes.image}
                    width={calculateWidth(20)}
                    height={calculateHeight(24)}
                  />
                ) : null}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} className={classes.textContainer}>
            <Grid container>
              <div className={classes.cartBody}>
                <div className={classes.productContainer}>
                  <div>
                    <b>{'WallArt : ' + value.name}</b>
                  </div>
                  {value.name == 'Family' ? (
                    <div>
                      <b>{`Height: 49"   Width: 27"`}</b>
                    </div>
                  ) : null}
                  {value.name == 'Trio' ? (
                    <div>
                      <b>{`Height: 49"   Width: 19"`}</b>
                    </div>
                  ) : null}
                  {value.name == 'Capture Four' ? (
                    <div>
                      <b>{`Height: 36"   Width: 36"`}</b>
                    </div>
                  ) : null}
                  {value.name == 'Family' ? (
                    <div>
                      <b>{`20x24 , (4) 8x10`}</b>
                    </div>
                  ) : null}
                  {value.name == 'Trio' ? (
                    <div>
                      <b>{`(3) 12x16`}</b>
                    </div>
                  ) : null}
                  {value.name == 'Capture Four' ? (
                    <div>
                      <b>{`(4) 14X14`}</b>
                    </div>
                  ) : null}
                  <div className={classes.buttons}>
                    {!value.thumbnail && (
                      <IconButton
                        className={classes.editAndAdd}
                        onClick={(): void => handleEditWallArt(value.name, value.id)}
                        aria-label="delete"
                        color="primary"
                      >
                        {t('Edit')}
                      </IconButton>
                    )}
                    <IconButton
                      className={classes.editAndAdd}
                      onClick={(): void => handleRemoveWallArt(value.id as string)}
                      aria-label="delete"
                      color="primary"
                    >
                      {t('Remove')}
                    </IconButton>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} className={`${classes.textContainer} ${classes.cartHidden}`}>
            <Grid container>
              <div className={classes.cartBody}>
                <div className={classes.cartDiv}>{value.price}</div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} className={classes.textContainer}>
            <Grid container className={classes.selectContainer}>
              <div className={classes.cartBody}>
                <div className={classes.cartDiv}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      name="quantity"
                      value={value.quantity}
                      defaultValue={value.quantity}
                      onChange={(e): void => handleWallArtQuantityChange(e, value.id as string)}
                    >
                      {options.map(renderOptions)}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2} className={classes.textContainer}>
            <Grid container>
              <div className={classes.cartBody}>
                <div className={classes.cartDiv}>$ {value.price * value.quantity}</div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {value.images.map((image: any, index: number) => {
          return (
            <Grid container className={classes.wallArtContainer} key={image.id}>
              <Grid item xs={12} md={2} container>
                <div className={classes.cartBody}>
                  <img
                    src={image.finalImageData ? 'data:image/png;base64,' + image.finalImageData : ''}
                    alt="wallArt"
                    className={classes.image}
                    width={image.finalImageData ? calculateWidth(image.printWidth) : 0}
                    height={image.finalImageData ? calculateHeight(image.printHeight) : 0}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4} className={classes.textContainer}>
                <Grid container>
                  <div className={classes.cartBody}>
                    <div className={classes.productContainer}>
                      <div>
                        <b>{'Image'}</b>
                      </div>
                      <div>
                        <b>{`Height: ${image.printHeight}"   Width: ${image.printWidth}"`}</b>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} container></Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  useEffect(() => {
    if (cartItems.data) {
      const data = cartItems.data.getMyOrderItems;
      let orderTotal = 0;
      if (data.DiscountCode !== '') {
        setDiscountcode(data.DiscountCode);
        if (data.discountCodeType === 'fix') {
          orderTotal = data.shippingPrice + (data.total - parseFloat(data.DiscountValue));
        } else {
          orderTotal = data.shippingPrice + (data.total - data.total * parseFloat(data.DiscountValue));
        }
      } else {
        orderTotal = data.shippingPrice + data.total;
      }
      setTotal(orderTotal);
    }
  }, [cartItems.data]);
  const handleApplyCode = (): void => {
    isValidDiscountCode({ variables: { input: { code: DiscountCode } } });
  };

  const handleRemoveRequest = (id: string, type: string): void => {
    removeItem({ variables: { input: { id, type } } });
  };
  const handleDiscountCodeChange = (event: any): void => {
    setDiscountcode(event.target.value);
  };

  if (
    cartItems.loading ||
    removingItem.loading ||
    updatingQuantity.loading ||
    discountCodeData.loading ||
    removingWallArt.loading ||
    updatingWallArtQuantity.loading
  )
    return <Loader />;
  if (cartItems.error) {
    navigate('/');
  }
  return (
    <TextureBg>
      <>
        <CheckoutBreadcrumb activeStep={CheckoutSteps.cart} />
        {cartItems.data.getMyOrderItems.images.length === 0 &&
        cartItems.data.getMyOrderItems.frames.length === 0 &&
        cartItems.data.getMyOrderItems.wallArts.length === 0 ? (
          <EmptyCart />
        ) : (
          <Grid container className={classes.totalContainer}>
            <Grid item xs={12} className={classes.textContainer}>
              <Grid container className={classes.cartHeaderContainer}>
                <Grid item xs={12} sm={6} className={classes.cartHeader}>
                  {t('Product')}
                </Grid>
                <Grid item xs={12} sm={2} className={classes.cartHeader}>
                  {t('UnitPrice')}
                </Grid>
                <Grid item xs={12} sm={2} className={classes.cartHeader}>
                  {t('Quantity')}
                </Grid>
                <Grid item xs={12} sm={2} className={classes.cartHeader}>
                  {t('SubTotal')}
                </Grid>
              </Grid>
              {cartItems.data.getMyOrderItems.images.map(Product)}
              {cartItems.data.getMyOrderItems.frames.map(Product)}
              {cartItems.data.getMyOrderItems.wallArts.map(WallArt)}
            </Grid>
            <Grid className={classes.subtotalContainer} item xs={12} lg={6}>
              <PaymentMethods />
            </Grid>
            <Grid className={classes.subtotalContainer} item xs={12} lg={6}>
              <Grid item xs={12} className={classes.textContainer}>
                <p>{t('SubTotal')}</p> $ {cartItems.data.getMyOrderItems.total}
              </Grid>
              <hr />
              <Grid item xs={12} className={classes.textContainer}>
                <p>{t('Coupon')}</p>{' '}
                {`${cartItems.data.getMyOrderItems.discountCodeType === 'percent' ? '% ' : '$ '}${
                  cartItems.data.getMyOrderItems.DiscountValue ? cartItems.data.getMyOrderItems.DiscountValue : 0
                }`}
              </Grid>
              <hr />
              <Grid item xs={12} className={classes.textContainer}>
                <p>{t('ShippingPrice')}</p> $ {cartItems.data.getMyOrderItems.shippingPrice}
              </Grid>
              <hr />
              <Grid item xs={12} className={classes.textContainer}>
                <p>{t('TotalAmount')}</p> $ {Total}
              </Grid>
              <Grid item xs={12} className={classes.buttonsContainer}>
                <div style={{ margin: '10px' }}>
                  <TextField
                    value={DiscountCode}
                    onChange={handleDiscountCodeChange}
                    variant="outlined"
                    type="input"
                    placeholder="Coupon Code"
                    size="small"
                    style={{ margin: '10px', borderRadius: 0 }}
                  />
                  <Button
                    onClick={(): void => handleApplyCode()}
                    variant="outlined"
                    color="primary"
                    style={{ borderRadius: 0, margin: '10px' }}
                  >
                    {t('ApplyCode')}
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={async (): Promise<void> => navigate('/shipping')}
                  color="primary"
                  className={classes.btn}
                >
                  {t('CheckOut')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
    </TextureBg>
  );
};

export default CartComponent;
