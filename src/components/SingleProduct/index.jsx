/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { GET_PRODUCT_BY_URI, ADD_FRAME_TO_CART } from '../../queries/products';
import Slider from './slider.jsx';
import Accordion from '../Accordion/index.jsx';
import productStyle from '../../assets/jss/material-kit-pro-react/views/productStyle.js';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import Loader from '../General/loader';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(productStyle);

const ProductPage = ({ uri }) => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_URI, { variables: { input: uri } });
  const [saveIt, { loading: saveLoading }] = useMutation(ADD_FRAME_TO_CART, {
    onCompleted: () => {
      navigate('/cart');
    },
  });
  const { t } = useTranslation('ProductPage');
  if (loading || saveLoading) return <Loader />;
  if (error) navigate('/');

  const product = data.getProductByUri;

  const handleSelect = event => {
    const sizeObj = product.sizes.find(item => item.id === event.target.value);
    if (sizeObj) {
      saveIt({ variables: { input: { sizeId: sizeObj.id, productId: product.id } } });
    }
  };
  return (
    <div className={classes.productPage}>
      <Grid container className={classes.productSection} justify="center">
        <Grid item xs={12} sm={12} md={9} className={classes.wrapper}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <Grid container>
              <Grid item md={6} sm={6}>
                <Slider images={product.images} />
              </Grid>
              <Grid item md={6} sm={6}>
                <h2 className={classes.title}>{product.productName}</h2>
                <Accordion
                  active={0}
                  collapses={[
                    {
                      title: `${t('Description')}`,
                      content: <p>{product.productDescription}</p>,
                    },
                  ]}
                />
                <Grid container className={classes.pickSize}>
                  <Grid item md={6} sm={6}>
                    <label>{t('SelectSize')}</label>
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <Select
                        value=""
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        onChange={handleSelect}
                        inputProps={{
                          name: 'sizeSelect',
                          id: 'size-select',
                        }}
                      >
                        {product.sizes.map(size => {
                          return (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              style={{ display: 'flex' }}
                              value={size.id}
                              key={size.id}
                            >
                              <span style={{ width: '80%', display: 'block' }}>{`${size.width}X${size.height} `}</span>
                              <span>${size.price}</span>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
