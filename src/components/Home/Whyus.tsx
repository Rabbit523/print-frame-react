import React from 'react';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  container,
  section: {
    ...section,
    padding: '15px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
  contentWrapper: {
    display: 'flex',
  },
  LeftItemsWrapper: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      padding: '70px 0 !important',
    },
  },
  itemsWrapper: {
    paddingLeft: '10px',
    paddingRight: '10px',
    '& p': {
      fontSize: '1.2em',
    },
  },
  item: {
    textAlign: 'center',
    '& img': {
      maxWidth: '100%',
    },
  },
  textItem: {
    color: '#19295A',
    padding: '0 35px',
    '& h2': {
      fontSize: '20px',
    },
    '& p': {
      fontSize: '16px',
    },
    '& button': {
      backgroundColor: '#082A4C',
      color: '#FABE69',
      padding: '10px 20px',
      outline: 0,
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingBottom: '15px',
    },
  },
  whyUs: {
    flex: 1,
    backgroundColor: '#19295A',
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/e_blackwhite/printAndFrameIt/bottomImg_sn3cnx.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 110%',
    backgroundSize: 'contain',
    minHeight: '300px',
    color: '#FABE69',
    textAlign: 'center',
    padding: '70px 40px !important',
    '& h2': {
      color: '#FABE69',
      textShadow: '0px 3px 6px #000000',
      fontSize: '55px',
      paddingBottom: '55px',
    },
    '& p': {
      fontSize: '22px',
      lineHeight: '33px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px 165px 20px !important',
      '& h2': {
        fontSize: '35px',
        paddingBottom: '15px',
      },
      '& p': {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  },
}));

export default function Whyus(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation('WhyUsSection');
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <Grid container justify="center" className={classes.contentWrapper} spacing={4}>
          <Grid item md={8} sm={8} className={classes.LeftItemsWrapper}>
            <Grid container justify="center" alignItems="center" className={classes.itemsWrapper} spacing={0}>
              <Grid item md={6} sm={6} className={classes.item}>
                <img
                  src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/pexels-photo_kuftjh.jpg"
                  alt="pexelsPhoto"
                  className="lazyload"
                />
              </Grid>
              <Grid item md={6} sm={6} className={classes.textItem}>
                <h2>{t('GridItems.WhiteShadowBox.Title')}</h2>
                <p>{t('GridItems.WhiteShadowBox.Content')}</p>
                <button>{t('GridItems.Button')}</button>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.itemsWrapper} spacing={0}>
              <Hidden mdUp>
                <Grid item md={6} sm={6} className={classes.item}>
                  <img
                    src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto,w_370,h_264/printAndFrameIt/black-gallery-frame_qy6cgd.jpg"
                    alt="black-gallery-frame"
                  />
                </Grid>
              </Hidden>
              <Grid item md={6} sm={6} className={classes.textItem}>
                <h2> {t('GridItems.BlackGalleryFrame.Title')} </h2>
                <p>{t('GridItems.BlackGalleryFrame.Content')}</p>
                <button>{t('GridItems.Button')}</button>
              </Grid>
              <Hidden smDown>
                <Grid item md={6} sm={6} className={classes.item}>
                  <img
                    src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto,w_370,h_264/printAndFrameIt/black-gallery-frame_qy6cgd.jpg"
                    alt="black-gallery-frame"
                  />
                </Grid>
              </Hidden>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.itemsWrapper} spacing={0}>
              <Grid item md={6} sm={6} className={classes.item}>
                <img
                  src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto,w_370,h_264/printAndFrameIt/black-canvas-floater_ucjouo.jpg"
                  alt="Black Canvas Floater"
                />
              </Grid>
              <Grid item md={6} sm={6} className={classes.textItem}>
                <h2> {t('GridItems.BlackCanvasFloater.Title')} </h2>
                <p>{t('GridItems.BlackCanvasFloater.Content')}</p>
                <button>{t('GridItems.Button')}</button>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.itemsWrapper} spacing={0}>
              <Hidden mdUp>
                <Grid item md={6} sm={6} className={classes.item}>
                  <img
                    src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto,w_370,h_264/printAndFrameIt/post-cuadros-para-salon_ndzb9b.jpg"
                    alt="Stretched Silverado Canvas"
                  />
                </Grid>
              </Hidden>
              <Grid item md={6} sm={6} className={classes.textItem}>
                <h2> {t('GridItems.StretchedSilveradoCanvas.Title')} </h2>
                <p>{t('GridItems.StretchedSilveradoCanvas.Content')}</p>
                <button>{t('GridItems.Button')}</button>
              </Grid>
              <Hidden smDown>
                <Grid item md={6} sm={6} className={classes.item}>
                  <img
                    src="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto,w_370,h_264/printAndFrameIt/post-cuadros-para-salon_ndzb9b.jpg"
                    alt="Stretched Silverado Canvas"
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} className={classes.whyUs}>
            <h2>{t('whyUsTitle')}</h2>
            <p>{t('WhyUsContent')}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
