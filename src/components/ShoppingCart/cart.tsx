import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead, makeStyles, Grid, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PaymentMethods from '../PaymentMethods/index';
import TextureBg from '../General/TextureBg';
import { CheckoutBreadcrumb, CheckoutSteps } from '../Bredcrumb';

type optionProps = {
  name: number;
};

type ProductProps = {
  size: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
  frameType: string;
  id: number;
};

type CartHeaderProps = {
  name: string;
};

type SubTotal = {
  subTotal: number;
  shipping: number;
};

type CartProps = {
  products: ProductProps[];
  cartHeader: CartHeaderProps[];
  total: SubTotal;
};

type ShoppingCartProps = {
  value: ProductProps;
  index: number;
};

const useStyles = makeStyles(theme => {
  return {
    cartContainer: {
      width: '80%',
      margin: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    totalContainer: {
      marginTop: '20px',
      marginBottom: '10px',
      width: '40%',
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
    },
    image: {
      width: '100px',
      // height: '70px',
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      marginLeft: '0px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
      },
    },
    productContainer: {
      marginLeft: '20px',
      [theme.breakpoints.only('xs')]: {
        marginLeft: '0px',
      },
    },
    buttons: {
      display: 'flex',
    },
    editButton: {
      marginLeft: '10px',
      borderLeft: '2px solid grey',
      paddingLeft: '10px',
    },
  };
});

const CartComponent = ({ products, cartHeader, total }: CartProps): JSX.Element => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { t } = useTranslation('Cart');
  const classes = useStyles();
  const [product, setProducts] = useState(products);
  const [itemPrice, setTotal] = useState();

  let price = 0;
  const totalPrice: any = [];

  const handleChange = (): void => {
    const GrandTotal = totalPrice.reduce((a: number, b: number) => a + b, 0);
    setTotal(GrandTotal);
  };

  useEffect(() => handleChange(), [product]);

  const renderOptions = (value: number, index: number): JSX.Element => {
    return (
      <option value={value} key={index}>
        {value}
      </option>
    );
  };

  const renderProducts = (value: ProductProps, index: number): JSX.Element => {
    return <Products value={value} index={index} />;
  };

  const Products = ({ value, index }: ShoppingCartProps): JSX.Element => {
    price = value.quantity * value.total;
    totalPrice.push(price);

    const handleProducts = (event: any): void => {
      const product: any = products.find(p => p.id === value.id);
      const productQuantity = (product.quantity = event.target.value);
      setProducts(productQuantity);
    };

    return (
      <TableRow key={index}>
        <TableCell className={classes.imageContainer}>
          <img src={value.image} alt="frame" className={classes.image} />
          <div className={classes.productContainer}>
            <div>{value.size}</div>
            <div>{value.frameType}</div>
            <div className={classes.buttons}>
              {t('Edit')}
              <div className={classes.editButton}>{t('Remove')}</div>
            </div>
          </div>
        </TableCell>
        <TableCell>{value.price}</TableCell>
        <TableCell>
          <select value={value.quantity} onChange={handleProducts}>
            {options.map(renderOptions)}
          </select>
        </TableCell>
        <TableCell>$ {value.quantity * value.total}</TableCell>
      </TableRow>
    );
  };

  const renderHead = (value: CartHeaderProps, index: number): JSX.Element => {
    return <TableCell key={index}>{value.name}</TableCell>;
  };

  return (
    <TextureBg>
      <>
        <CheckoutBreadcrumb activeStep={CheckoutSteps.cart} />
        <Grid container className={classes.cartContainer}>
          <Table>
            <TableHead>
              <TableRow>{cartHeader.map(renderHead)}</TableRow>
            </TableHead>
            <TableBody>{products.map(renderProducts)}</TableBody>
          </Table>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <PaymentMethods />
          </Grid>
          <div className={classes.totalContainer}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.textContainer}>
              <p>{t('SubTotal')}</p> $ {itemPrice}
            </Grid>
            <hr />
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.textContainer}>
              <p>{t('ShoppingAndHandling')}</p> $ {total.shipping}
            </Grid>
            <hr />
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.textContainer}>
              <p>{t('TotalAmount')}</p> $ {itemPrice + total.shipping}
            </Grid>
            <div className={classes.textContainer}>
              <Button variant="outlined">{t('Coupon Code')}</Button>
              <Button variant="outlined" color="primary">
                {t('ApplyCode')}
              </Button>
            </div>
          </div>
        </Grid>
      </>
    </TextureBg>
  );
};

export default CartComponent;
