import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';
import { useTranslation } from 'react-i18next';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container,
  section: {
    ...section,
    padding: '70px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
  footerWidget: {
    ...section,
    background: '#1F1F1F',
    padding: '70px 0px',
  },
  root: {
    flexGrow: 1,
    background: '#1F1F1F',
    paddingBottom: '80px',
    marginTop: 'auto',
  },
  contentWrapper: {
    width: '100%',
  },
  footer: {
    background: '#1F1F1F',
  },
  title: {
    color: '#A9B800',
    textTransform: 'uppercase',
    margin: theme.spacing(4, 0, 2),
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  listItem: {
    color: '#FABE69',
    margin: '0',
    padding: '0',
    justifyContent: 'left',
  },
  Link: {
    color: '#FABE69',
    textDecoration: 'none',
  },
  CopyRight: {},
}));

const Footer = (): JSX.Element => {
  const myDate = new Date();
  const year = myDate.getFullYear();
  const { t } = useTranslation('Footer');
  const classes = useStyles();
  return (
    <div>
      <div className={classes.footerWidget}>
        <div className={classes.container}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1} className={classes.contentWrapper}>
                <Grid item sm={6} xs={12} md={3}>
                  <List dense className={classes.listItem}>
                    <Typography variant="h6" className={classes.title}>
                      {t('SecondColumn.name')}
                    </Typography>
                    <ListItem>
                      <Link to="/uploader" className={classes.Link}>
                        <ListItemText primary={t('ThirdColumn.UploadFiles')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/return-policy" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.ReturnPolicy')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/faq" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.FAQ')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/privacy-policy" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.PrivacyPolicy')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/terms-and-conditions" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.TermsAndCondition')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/shipping-policy" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.ShippingPolicy')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/login" className={classes.Link}>
                        <ListItemText primary={t('SecondColumn.Login')} />
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item sm={6} xs={12} md={3}>
                  <List dense className={classes.listItem}>
                    <Typography variant="h6" className={classes.title}>
                      {t('ForthColumn.name')}
                    </Typography>
                    <ListItem>
                      <Link to="/canvas" className={classes.Link}>
                        <ListItemText primary={t('ForthColumn.PrintAndFrameIt')} />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={t('ForthColumn.Street')} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={t('ForthColumn.City')} />
                    </ListItem>
                    <ListItem>
                      <a href={`tel:${t('ForthColumn.Phone')}`}>{t('ForthColumn.Phone')} </a>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={t('ForthColumn.Email')} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.CopyRight}>
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
          style={{ backgroundColor: 'black', height: '40px', padding: '30px 0' }}
        >
          <Grid item xs={12} md={6} lg={4} style={{ color: 'white', textAlign: 'center' }}>
            {`${t('CopyRight.First')} ${year} ${t('CopyRight.Second')} `}
            <br />
            {t('CopyRight.Third')}
            <a href="https://seodapop.com" target="blank">
              SeodaPop
            </a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
