import React from 'react';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';
import { useTranslation } from 'react-i18next';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container,
    section: {
      ...section,
      padding: '15px 0px',
      '& h4$description': {
        fontSize: '1.5em',
      },
    },
    topContent: {
      marginBottom: '150px',
    },
    colorCircle: {
      backgroundColor: 'black',
      width: 80,
      height: 80,
      margin: '20px auto',
      borderRadius: '50%',
      [theme.breakpoints.down('sm')]: {
        width: 60,
        height: 60,
      },
    },
    colorContainer: {
      border: '1px solid #979797',
    },
    heading: {
      color: '#556818',
      textAlign: 'center',
      padding: '30px',
      fontSize: '32px',
      fontFamily: 'Georgia',
    },
    varietyHeading: {
      color: 'black',
      textAlign: 'center',
      padding: '30px',
      fontSize: '32px',
      fontFamily: 'Georgia',
      display: 'inline-block',
      width: '60%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    titleHr: {
      margin: 0,
      width: '20%',
      display: 'inline-block',
      borderColor: '#b6b6b6',
      marginBottom: 13,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    paragraph: {
      textAlign: 'center',
      width: '60%',
      margin: 'auto',
      padding: '10px',
      fontSize: 24,
      fontFamily: 'Century Gothic Pro',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    colorTitle: {
      textAlign: 'center',
      width: '95px',
      margin: 'auto',
      padding: '10px',
      fontSize: 24,
      fontFamily: 'Century Gothic Pro',
    },
    imageContainer: {
      display: 'flex',
      marginBottom: '80px',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    image: {
      width: '100%',
      marginRight: '20px',
    },
    bottomContent: {
      fontSize: '22px',
      fontFamily: 'Century Gothic Pro',
      lineHeight: '24px',
    },
    button: {
      background: '#19295A',
      width: '280px',
      borderRadius: '0',
      fontFamily: 'Century Gothic Pro',
      '& a': {
        color: '#FABE69',
        textDecoration: 'none',
      },
    },
    varietyContainer: {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    wallArt: {
      '& :hover': {
        border: 'solid 2px red',
      },
    },
  }),
);

interface PhotoDetailProps {
  imageLink?: string;
  type?: string;
}

const PhotoDetail = ({ imageLink, type }: PhotoDetailProps): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('PhotoDetail');
  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.topContent}>
        <h2 className={classes.heading}>{t('PhotoDetail')}</h2>
        <p className={classes.paragraph}>{t('TopContent')}</p>
      </Grid>
      <Grid container spacing={2} className={classes.imageContainer}>
        <Grid item xs={12} sm={6}>
          <img
            src={
              imageLink
                ? imageLink
                : 'https://res.cloudinary.com/dpvymgk1m/image/upload/v1576728156/printAndFrameIt/black-canvas-floater_ucjouo.jpg'
            }
            alt=""
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <p className={classes.bottomContent}>{type ? t(type) : ''}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhotoDetail;
