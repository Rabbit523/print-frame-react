import React from 'react';
import Grid from '@material-ui/core/Grid';
import BackupIcon from '@material-ui/icons/Backup';
import BrushIcon from '@material-ui/icons/Brush';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  iconsWrapper: {},
  itemsWrapper: {
    background: '#FFF3F3',
    minHeight: '270px',
    padding: '30px 10px',
    margin: '60px 0',
    '& p': {
      fontSize: '21px',
      lineHeight: '30px',
    },
  },
  item: {
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'relative',
    fontSize: '100px',
    border: '1px solid #082A4C',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: 'inset 0px 0px 3px 1px #333',
    marginTop: '-105px',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
}));
const ProcessSection = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('ProcessSections');
  return (
    <Grid container justify="center" alignItems="center" className={classes.itemsWrapper} spacing={1}>
      <Hidden smDown>
        <Grid container justify="center" alignItems="center" className={classes.iconsWrapper} spacing={1}>
          <Grid item md={4} sm={3} xs={12} className={classes.item}>
            <BackupIcon className={classes.svg} />
          </Grid>
          <Grid item md={4} sm={3} xs={12} className={classes.item}>
            <BrushIcon className={classes.svg} />
          </Grid>
          <Grid item md={4} sm={3} xs={12} className={classes.item}>
            {' '}
            <LocalShippingIcon className={classes.svg} />
          </Grid>
        </Grid>
      </Hidden>
      <Grid item md={4} sm={3} xs={12} className={classes.item}>
        <Hidden mdUp>
          <BackupIcon className={classes.svg} />
        </Hidden>
        <p>{t('Upload')}</p>
      </Grid>
      <Grid item md={4} sm={3} xs={12} className={classes.item}>
        <Hidden mdUp>
          <BrushIcon className={classes.svg} />
        </Hidden>
        <p>{t('Brush')}</p>
      </Grid>
      <Grid item md={4} sm={3} xs={12} className={classes.item}>
        <Hidden mdUp>
          <LocalShippingIcon className={classes.svg} />
        </Hidden>
        <p>{t('Delivery')}</p>
      </Grid>
    </Grid>
  );
};

export default ProcessSection;
