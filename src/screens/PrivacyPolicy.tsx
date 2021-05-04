import React from 'react';
import Main from '../layouts/Main';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    maxWidth: '830px',
    margin: '0 auto',
  },
  title: {
    color: '#A9B800',
    margin: theme.spacing(4, 0, 2),
  },
}));

const PrivacyPolicy = (): JSX.Element => {
  const { t } = useTranslation('TermsAndConditions');
  const classes = useStyles();

  return (
    <Main title="Privacy Policy" description="you upload and we print it" pageId="TermsAndConditions">
      <FullPageTemplate>
        <>
          <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/bigstock--223090822_genmth.jpg">
            <div></div>
          </HeroImage>
          <Grid container className={classes.root} justify="center" direction="column" alignItems="center">
            <Grid xs={10}>
              <Typography variant="h5" className={classes.title}>
                {t('PrivacyTitle')}
              </Typography>
              <p>
                {t('PrivacyContent')
                  .split('\n')
                  .reduce((r: any, c: any, x: any) => (r ? [...r, <br key={x} />, c] : [c]), null)}
              </p>
            </Grid>
          </Grid>
        </>
      </FullPageTemplate>
    </Main>
  );
};

export default PrivacyPolicy;
