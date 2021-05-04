import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_MY_ORDER_IMAGES } from '../queries/images';
import Loader from './General/loader';
import { navigate, Link } from '@reach/router';
import { makeStyles, createStyles, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/browser';
import Uploader from './Uploader';

const useStyles = makeStyles(() =>
  createStyles({
    container: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    items: { width: '30%', display: 'contents' },
    image: { margin: '10px' },
  }),
);

interface ImageInfo {
  name: string;
  base64: string;
  base64GrayScale: string;
}
const ImageAlbum = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('ImageAlbum');
  const { data: ImageData, error, loading } = useQuery(GET_MY_ORDER_IMAGES);
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (ImageData && !error) {
      setImages(ImageData.getAllMyImages);
    }
  }, [ImageData]);

  if (loading) return <Loader />;

  if (error) {
    Sentry.captureException(error);
    navigate('/');
  }

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={10}>
        <h1 style={{ textAlign: 'center' }}>{t('Title')}</h1>
        <div className={classes.container}>
          {Images.map((item: ImageInfo) => (
            <div key={item.name} className={classes.items}>
              <Link to={`/image-editor/${item.name}`}>
                <img
                  src={`data:img/jpeg;base64,${item.base64}`}
                  alt=""
                  width="200"
                  height="auto"
                  className={classes.image}
                />
              </Link>
            </div>
          ))}
        </div>
        <Uploader />
      </Grid>
    </Grid>
  );
};
export default ImageAlbum;
