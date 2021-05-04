import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Link, navigate } from '@reach/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    prints: {
      width: 'auto',
      background: '#FABE69',
      color: '#F0EEDD',
      textShadow: '3px 3px 6px #000000',
      textTransform: 'capitalize',
      fontSize: '22px',
      borderRadius: '0',
      [theme.breakpoints.down('sm')]: {
        background: '#082A4C',
        display: 'block',
        width: '100%',
        marginBottom: '10px',
      },
    },
    frames: {
      background: '#A9B800',
      color: '#F0EEDD',
      textShadow: '3px 3px 6px #000000',
      textTransform: 'capitalize',
      fontSize: '22px',
      borderRadius: '0',
      [theme.breakpoints.down('sm')]: {
        background: '#082A4C',
        display: 'block',
        width: '100%',
        marginBottom: '10px',
      },
    },
    printsAndFrames: {
      background: '#51660A',
      color: '#F0EEDD',
      textShadow: '3px 3px 6px #000000',
      textTransform: 'capitalize',
      fontSize: '22px',
      borderRadius: '0',
      [theme.breakpoints.down('sm')]: {
        background: '#082A4C',
        display: 'block',
        width: '100%',
        marginBottom: '10px',
      },
    },
    wallArt: {
      background: '#082A4C',
      color: '#F0EEDD',
      textShadow: '3px 3px 6px #000000',
      textTransform: 'capitalize',
      fontSize: '22px',
      borderRadius: '0',
      [theme.breakpoints.down('sm')]: {
        background: '#082A4C',
        display: 'block',
        width: '100%',
        marginBottom: '10px',
      },
    },
    Links: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      color: 'white',
      textDecoration: 'none',
      height: '65px',
      opacity: '0.8',
    },
  }),
);

export default function ServicesButton(): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation('ServicesButton');
  return (
    <Grid item xs={12} className={classes.root}>
      <Button className={classes.prints}>
        <Link to="/prints" style={{ color: 'white', textDecoration: 'none' }}>
          {t('Prints')}
        </Link>
      </Button>
      <Button className={classes.frames}>
        <Link to="/frames" style={{ color: 'white', textDecoration: 'none' }}>
          {t('Frames')}
        </Link>
      </Button>
      <Button className={classes.printsAndFrames}>
        <Link to="/print-frames" style={{ color: 'white', textDecoration: 'none' }}>
          {t('PrintsAndFrames')}
        </Link>
      </Button>
      <Button className={classes.wallArt}>
        <Link to="/wall-art" style={{ color: 'white', textDecoration: 'none' }}>
          {t('WallArt')}
        </Link>
      </Button>
    </Grid>
  );
}
