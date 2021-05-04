import React from 'react';
import Main from '../layouts/Main';
import FullPageTemplate from '../layouts/FullPageTemplate';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import HeroImage from '../components/HeroImage';
import { Grid, Typography } from '@material-ui/core';

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

const ReturnPolicy = (): JSX.Element => {
  const { t } = useTranslation('ReturnPolicy');
  const classes = useStyles();

  return (
    <Main title="Return Policy" description="you upload and we print it" pageId="ReturnPolicy">
      <FullPageTemplate>
        <>
          <HeroImage headerImage="https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto//printAndFrameIt/bigstock-Justice-And-Law-Concept-In-Tec-176816374_huobqg.jpg">
            <div></div>
          </HeroImage>
          <Grid container className={classes.root} justify="center" direction="column" alignItems="center">
            <Grid xs={10}>
              <Typography variant="h5" className={classes.title}>
                {t('Title')}
              </Typography>
              <p>
                {t('Content')
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

export default ReturnPolicy;
