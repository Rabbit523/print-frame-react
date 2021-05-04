import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { getImageUrl } from '../../utils/cloudinary';
import { navigate } from '@reach/router';

const useStyles = makeStyles(theme => {
  return {
    cartItemHeader: {
      width: '100%',
      textAlign: 'center',
      margin: '20px 0',
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    cartHeader: {
      width: '100%',
      textAlign: 'center',
      display: 'block',
      paddingBottom: 20,
      borderBottom: '1px solid darkgrey',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    editAndAdd: {
      fontSize: 20,
      color: '#2772b0',
      padding: 0,
      paddingRight: 20,
    },
    cartBody: {
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        height: 'unset',
      },
    },
    cartDiv: {
      paddingTop: 0,
    },
    cartPrice: {
      paddingTop: 30,
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
        fontSize: 30,
      },
    },
    boxContainer: {
      border: '1px solid #d9d9d9',
      backgroundColor: '#F9F9F9',
      padding: 30,
    },
    borderBottom: {
      borderBottom: 'solid 1px black',
    },
    editContainer: {
      marginTop: -90,
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
    cartContainer: {
      margin: 'auto',
      padding: '20px 0',
      borderBottom: '1px solid darkgrey',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    wallArtContainer: {
      width: '100%',
      margin: 'auto',
      padding: '20px 0',
    },
    textContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 'auto',
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
    image: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
      },
    },
  };
});
const CartItems = ({ items, wallArts }: { items: any; wallArts: any }): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('CartItems');

  const handleEditRequest = (id: string): void => {
    navigate(`/image-editor/${id}`);
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
  return (
    <Grid container className={classes.boxContainer}>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className={classes.cartHeader}>
        {t('Product')}
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className={classes.cartHeader}>
        {t('Unit Price')}
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className={classes.cartHeader}>
        {t('Quantity')}
      </Grid>
      {items.map((item: any) => (
        <Grid container key={item.id} className={classes.cartContainer}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid container>
              <div className={classes.cartBody}>
                <img
                  src={item.thumbnail ? getImageUrl(item.thumbnail) : 'data:image/png;base64,' + item.finalImageData}
                  alt="product"
                  className={classes.image}
                  width={item.thumbnail ? calculateWidth(item.width) : calculateWidth(item.printWidth)}
                  // height={item.thumbnail ? calculateHeight(item.height) : calculateHeight(item.printHeight)}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid container>
              <div className={classes.cartBody}>
                <div className={classes.cartDiv}>
                  <p>
                    <b>{item.thumbnail ? 'Frame' : 'Image'}</b>
                  </p>

                  {item.thumbnail ? (
                    <div>{`Height: ${item.height}"   Width: ${item.width}"`}</div>
                  ) : (
                    <div>{`Height: ${item.printHeight}"   Width: ${item.printWidth}"`}</div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid container>
              <div className={classes.cartBody}>
                <div className={classes.cartPrice}>
                  <p>${item.price * item.quantity}</p>
                  <p className={classes.editContainer}>
                    <IconButton
                      className={classes.editAndAdd}
                      onClick={(): void => handleEditRequest(item.name)}
                      aria-label="edit"
                      color="primary"
                    >
                      {t('Edit')}
                    </IconButton>
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {wallArts.map((value: any) => (
        <Grid container className={classes.cartContainer} key={value.id}>
          <Grid container className={classes.wallArtContainer}>
            <Grid item xs={12} md={4} container>
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
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.textContainer}>
              <Grid container>
                <div className={classes.cartBody}>
                  <div className={classes.cartDiv}>$ {value.price * value.quantity}</div>
                  <p className={classes.editContainer}>
                    <IconButton
                      className={classes.editAndAdd}
                      onClick={(): void => handleEditWallArt(value.name, value.id)}
                      aria-label="edit"
                      color="primary"
                    >
                      {t('Edit')}
                    </IconButton>
                  </p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {value.images.map((image: any, index: number) => {
            return (
              <Grid container className={classes.wallArtContainer} key={image.id}>
                <Grid item xs={12} md={4} container>
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
                <Grid item xs={12} md={4} container></Grid>
              </Grid>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
};
export default CartItems;
