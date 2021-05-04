import React from 'react';
import CheckFrameChoices from '../components/CheckFrameChoices';
import ChooseOurVariety from '../components/ChooseOurVariety';
import PhotoDetail from '../components/PhotoDetails';
import Main from '../layouts/Main';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
import { useTranslation } from 'react-i18next';
import { useStyles } from './Prints';
import { Paper, Button } from '@material-ui/core';
import { Link } from '@reach/router';

const PrintAndFrames = (): JSX.Element => {
  const { t } = useTranslation('PrintAndFrames');
  const classes = useStyles();
  return (
    <Main title="Print And Frames" description="you upload and we print it" pageId="PrintAndFrames">
      <FullPageTemplate>
        <>
          <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/pexels-photo-2894275_ogdn2a.jpg">
            <div className={classes.container} style={{ alignSelf: 'flex-end' }}>
              <div className={classes.bannerContentArea}>
                <div className={classes.title3}>
                  <h2>{t('Title1')}</h2>
                  <h2>{t('Title2')}</h2>
                  <h2>{t('Title3')}</h2>
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
            imageLink="https://res.cloudinary.com/dpvymgk1m/image/upload/v1582414983/printAndFrameIt/pexels-photo-2097118_2x_dvxl8n.png"
          />
          <CheckFrameChoices />
          <ChooseOurVariety />
        </>
      </FullPageTemplate>
    </Main>
  );
};

export default PrintAndFrames;
