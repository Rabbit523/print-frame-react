import React from 'react';
import Main from '../layouts/Main';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import FullPageTemplate from '../layouts/FullPageTemplate';
import HeroImage from '../components/HeroImage';
import FaqComponent from '../components/Faq';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    maxWidth: '830px',
    margin: '150px auto',
  },
}));

const Faq = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Main title="Privacy Policy" description="you upload and we print it" pageId="TermsAndConditions">
      <FullPageTemplate>
        <>
          <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/bigstock--223090822_genmth.jpg">
            <div></div>
          </HeroImage>
          <Grid container className={classes.root} justify="center" direction="column" alignItems="center">
            <FaqComponent />
          </Grid>
        </>
      </FullPageTemplate>
    </Main>
  );
};

export default Faq;
