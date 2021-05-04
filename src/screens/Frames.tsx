import React from 'react';
import PhotoDetail from '../components/PhotoDetails';
import FramesList from '../components/FramesList/index';
import PhotoUploader from '../components/PhotoUploader';
import Main from '../layouts/Main';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';
import { useStyles } from './Prints';
const Frames = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('FramesPage');
  return (
    <Main title="Frames" description="you upload and we print it" pageId="Frames">
      <FullPageTemplate>
        <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/pexels-photo-1579708_wfq1sy.jpg">
          <div className={classes.container} style={{ alignSelf: 'flex-end' }}>
            <div className={classes.bannerContentArea}>
              <h2>{t('Title')}</h2>
              <Paper className={classes.bannerLeftContent}>
                <h3 style={{ margin: 0 }}>{t('BannerContentTitle')}</h3>
                <h4 style={{ marginTop: 0, textAlign: 'center' }}>{t('SubContentTitle')}</h4>
                <p>{t('ContentOne')}</p>
                <p>{t('ContentTwo')}</p>
                <p>{t('ContentThree')}</p>
                <Button variant="contained" color="primary" className={classes.button}>
                  <Link to="/uploader">{t('Button')}</Link>
                </Button>
              </Paper>
            </div>
          </div>
        </HeroImage>
        <PhotoDetail
          type="Frames"
          imageLink="https://res.cloudinary.com/dpvymgk1m/image/upload/v1582415252/printAndFrameIt/pexels-photo-354939_2x_gdmulv.png"
        />
        <FramesList />
        <PhotoUploader />
      </FullPageTemplate>
    </Main>
  );
};

export default Frames;
