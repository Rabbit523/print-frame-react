import React from 'react';
import WallDisplay from '../components/WallDisplay';
import PhotoDetail from '../components/PhotoDetails';
import Main from '../layouts/Main';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Prints';
import { Paper, Button } from '@material-ui/core';
import { Link } from '@reach/router';

const WallArt = (): JSX.Element => {
  const { t } = useTranslation('WallArt');
  const classes = useStyles();
  return (
    <Main title="Wall Art" description="you upload and we print it" pageId="WallArt">
      <FullPageTemplate>
        <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/v1582917120/printAndFrameIt/bigstock-Decorator-Hanging-Picture-On-W-314770372_2x_dt0zny.png">
          <div className={classes.container} style={{ alignSelf: 'flex-end' }}>
            <div className={classes.bannerContentArea}>
              <div className={classes.title3}>
                <h2>{t('Title1')}</h2>
                <h2>{t('Title2')}</h2>
              </div>
              <Paper className={classes.bannerLeftContent}>
                <h3>{t('BannerContentTitle')}</h3>
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
          type="PrintsAndFrames"
          imageLink="https://res.cloudinary.com/dpvymgk1m/image/upload/v1582917316/printAndFrameIt/bigstock-interior-decoration-and-renova-306853003_2x_yf9awn.png"
        />
        <WallDisplay />
      </FullPageTemplate>
    </Main>
  );
};

export default WallArt;
