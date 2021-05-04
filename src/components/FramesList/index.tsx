import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_PRODUCTS } from '../../queries/products';
import Loader from '../General/loader';
import { navigate } from '@reach/router';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';
import { Image, Transformation } from 'cloudinary-react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container,
    root: {
      ...section,
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      padding: '10px 0',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    productName: {
      '& h3': {
        color: '#19295A',
      },
    },
    tableRow: {
      display: 'flex',
    },
    imageCell: {
      flex: 1,
      maxWidth: '200px',
    },
    productContent: {
      flex: 3,
    },
    buttonCell: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    button: {
      background: '#19295A',
      borderRadius: '0',
      color: '#FABE69',
    },
  }),
);
const FrameList = (): JSX.Element => {
  const { t } = useTranslation('FrameList');
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const classes = useStyles();
  if (loading) return <Loader />;
  if (error) navigate('/');
  const {
    getAllProducts: { products },
  } = data;
  return (
    <Grid container className={classes.root} direction="column" justify="center">
      <Grid item md={12} lg={8} xl={6} className={classes.container}>
        {products.map(
          (row: any): JSX.Element => (
            <List key={row.uri}>
              <Grid container spacing={2} className={classes.gridList}>
                <Grid item xs={12} md={2}>
                  <Image publicId={row.Thumbnail}>
                    <Transformation height="150" width="150" crop="scale" quality="auto" />
                  </Image>
                </Grid>
                <Grid item xs={12} md={8}>
                  <h3>{row.productName}</h3>
                  <p>{row.productDescription}</p>
                </Grid>
                <Grid item xs={12} md={2} className={classes.buttonCell}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(): void => {
                      navigate(`/frames/${row.uri}`);
                    }}
                  >
                    {t('SelectButton')}
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </List>
          ),
        )}
      </Grid>
    </Grid>
  );
};
export default FrameList;
