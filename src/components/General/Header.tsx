import React, { useEffect, useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from '@reach/router';
import { load } from 'recaptcha-v3';
import { Helmet } from 'react-helmet';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import LoginModal from './../Login/LoginModal';
import { AuthContext } from '../../containers/firebase/AuthProvider';
import config from '../../env';

interface HeaderProps {
  title: string;
  description: string;
  pageId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Header: {
      flexGrow: 1,
      position: 'relative',
      zIndex: 10,
    },
    navigation: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTop: '35px solid #19295A',
        minHeight: '114px',
      },
    },
    Logo: {
      '& img': {
        maxWidth: '150px',
        position: 'relative',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    socialIcons: {
      color: '#222222',
      fontSize: '40px',
      marginRight: '25px',
    },
    icon: {
      color: '#222222',
      fontSize: '29px',
    },
    desktopMenu: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    mobileTopBar: {
      display: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '10px',
      padding: '0 5px',
      '& p': {
        display: 'flex',
        alignItems: 'center',
      },
      '& svg': {
        fontSize: '1.0rem',
      },
    },
    mobileMenu: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '0 10px',
      backgroundColor: '#f1f1f1',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    mobileLinkItem: {
      color: '#082A4C',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      marginRight: '15px',
      width: '100%',
    },
    loginWrapper: {
      display: 'flex',
      justifyItems: 'baseline',
      alignItems: 'center',
      marginRight: '20px',
    },
    link: {
      color: '#222222',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      marginRight: '15px',
    },
    login: {
      color: '#222222',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      paddingRight: '7px',
    },
    logout: {
      color: '#222222',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      paddingLeft: '7px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    intro: {
      color: '#A9B800',
      display: 'block',
      textAlign: 'center',
      '& span': {
        fontSize: '16px',
      },
    },
  }),
);

const Header = ({ title, description, pageId }: HeaderProps): JSX.Element => {
  const classes = useStyles();
  const { authenticated, handleSignOut } = useContext(AuthContext);
  const { t } = useTranslation('Header');
  // const checkCaptcha = async (): Promise<void> => {
  //   if (config.CAPTCHA_PUBLIC_KEY) {
  //     const recaptcha = await load(config.CAPTCHA_PUBLIC_KEY as string);
  //     await recaptcha.execute(pageId);
  //   }
  // };
  useEffect(() => {
    // checkCaptcha();
  }, []);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
  const toggleDrawer = (side: DrawerSide, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = (side: DrawerSide): JSX.Element => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <Link to="/" className={classes.mobileLinkItem}>
            <ListItemText primary={t('Home')} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/faq" className={classes.mobileLinkItem}>
            <ListItemText primary={t('Faq')} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/prints" className={classes.mobileLinkItem}>
            <ListItemText primary={t('Prints')} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/frames" className={classes.mobileLinkItem}>
            <ListItemText primary={t('Frames')} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/print-frames" className={classes.mobileLinkItem}>
            <ListItemText primary={t('PrintAndFrameIt')} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <a href="#" className={classes.login} onClick={() => setIsOpen(true)}>
            {t('Login')}
          </a>
        </ListItem>
        <Divider />
        <ListItem className={classes.intro}>
          <ListItemText primary={t('Intro')} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.Header}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={classes.navigation}>
        <div className={classes.Logo}>
          <Link to="/">
            <img
              src={`https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/logo_white_back_mwai4o.jpg`}
              alt="Logo"
              style={{ position: 'absolute', top: '39px' }}
            />
          </Link>
        </div>
        <Hidden smUp>
          <div className={classes.mobileTopBar}>
            <p>
              <CheckIcon /> {t('MobileTobBar.LeftContent')}{' '}
            </p>
            <p>
              <CheckIcon />
              {t('MobileTobBar.RightContent')}
            </p>
          </div>
        </Hidden>
        <nav className={classes.mobileMenu}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('top', true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/cart">
            <ShoppingCartIcon className={classes.icon} />
          </Link>
        </nav>
        <nav className={classes.desktopMenu}>
          <div className={classes.socialIcons}>
            <a className={classes.icon} href={`${config.INSTAGRAM}`}>
              <InstagramIcon />
            </a>
            <a className={classes.icon} href={`${config.FACEBOOK}`}>
              <FacebookIcon />
            </a>
            <a className={classes.icon} href={`${config.TWITTER}`}>
              <TwitterIcon />
            </a>
          </div>
          <Link to="/faq" className={classes.link}>
            <HelpOutlineOutlinedIcon className={classes.icon} />
            Help
          </Link>
          <div className={classes.loginWrapper}>
            <PersonIcon className={classes.icon} />

            {authenticated ? (
              <Link to="#" onClick={handleSignOut} className={classes.logout}>
                Logout
              </Link>
            ) : (
              <Link to="#" className={classes.login} onClick={(): void => setIsOpen(true)}>
                Login
              </Link>
            )}
          </div>
          <Link to="/cart">
            <ShoppingCartIcon className={classes.icon} />
          </Link>
        </nav>
        <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
          {fullList('top')}
        </Drawer>
      </div>
      <LoginModal isOpen={isOpen} onClose={(): void => setIsOpen(false)} />
    </div>
  );
};
export default Header;
