import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../PhotoDetails';

const ChooseOurVariety = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('ChooseOurVariety');
  return (
    <Grid container justify="center" alignItems="center" className={`${classes.container} ${classes.varietyContainer}`}>
      <Grid item sm={12}>
        <hr className={classes.titleHr} />
        <h2 className={classes.varietyHeading}>{t('Title')}</h2>
        <hr className={classes.titleHr} />
      </Grid>
      <Grid container className={classes.imageContainer} spacing={2}>
        <Grid item sm={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('Silver')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#D1D1D1 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('Walnut')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#550C0C 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('Oak')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#A69885 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('White')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#FFFFFF 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('Black')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#000000 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.colorContainer}>
                <p className={classes.colorTitle}>{t('Brown')}</p>
                <div
                  className={classes.colorCircle}
                  style={{ background: '#5C4428 0% 0% no-repeat padding-box', border: '0.5px solid #979797' }}
                ></div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={5}>
          <Grid container>
            <img
              src={'https://res.cloudinary.com/dpvymgk1m/image/upload/v1582415061/printAndFrameIt/corner_2x_kldsmn.png'}
              alt=""
              className={classes.image}
              style={{ height: 380 }}
            />
          </Grid>
        </Grid>
        <Grid item sm={12} className={classes.heading}>
          <Button variant="contained" color="primary" className={classes.button}>
            <Link to="/frames">{t('Create a Framed Print')}</Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChooseOurVariety;
