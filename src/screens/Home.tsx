import React from 'react';
import Main from '../layouts/Main';
import ProcessSectionsBg from '../components/Home/ProcessSectionsBg';
import WhyUs from '../components/Home/Whyus';
import { Reviews } from '../components/Reviews';
import { PaymentMethodComponent } from '../components/PaymentMethods';
import SalesTable from '../components/SalesTable';
import Contact from './Contact';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import ProcessSection from '../components/Home/ProcessSection';
import { makeStyles } from '@material-ui/core/styles';
import { container, section } from './../assets/jss/material-kit-pro-react.js';
import HeroImage from '../components/HeroImage';
import Uploader from '../components/Uploader';
const styles = {
  bigFrame: {
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/Picture-framing-jumbo_mkiped.jpg)`,
    height: '542px',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginBottom: '200px',
  },
  bottomLogo: {
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/bottomImg_sn3cnx.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-50px 0px',
    backgroundSize: '100%,100%',
    overflow: 'hidden',
  },

  tagLine: {
    color: '#B28047',
    fontSize: 45,
    marginBottom: '-10px',
    marginLeft: '10px',
    fontFamily: 'Georgia',
    textShadow: '2px 3px 2px #000',
  },
  description: {
    fontSize: 30,
    marginLeft: 10,
    width: '55%',
    textShadow: '2px 3px 2px #000',
  },
};

const useStyles = makeStyles(() => ({
  container,
  section: {
    ...section,
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto/q_auto/printAndFrameIt/Picture-framing-jumbo_mkiped.jpg)`,
    padding: '70px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
  headerTextContainer: {
    margin: 'auto',
  },
}));

const Wrapper = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('Home');
  return (
    <Main title="print and frame it" description="you upload and we print it" pageId="Home">
      <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/uploader-background_fji0op.jpg">
        <Grid container>
          <Grid item md={6} className={classes.headerTextContainer}>
            <div
              style={{
                borderLeft: '10px solid #19295A',
                color: 'white',
              }}
            >
              <p style={{ ...styles.tagLine }}>{t('HeaderText1')}</p>
              <p style={{ ...styles.description }}>{t('HeaderText2')}</p>
            </div>
          </Grid>
          <Grid item xs={12} md={12}>
            <Uploader />
          </Grid>
        </Grid>
      </HeroImage>
      <ProcessSectionsBg>
        <ProcessSection />
      </ProcessSectionsBg>
      <WhyUs />
      <div className={classes.section}>
        <div className={classes.container}>
          <ProcessSection />
        </div>
      </div>
      <SalesTable />
      <Reviews />
      <PaymentMethodComponent />
      <Grid container>
        <Contact />
      </Grid>
    </Main>
  );
};
export default Wrapper;
