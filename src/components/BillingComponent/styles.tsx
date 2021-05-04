import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    mainContainer: {
      padding: '4px',
    },
    cardContainer: {
      border: '1px solid grey',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      background: '#f9f9f9',
    },
    paypalContainer: {
      marginTop: '20px',
      border: '1px solid grey',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      background: '#f9f9f9',
    },
    heading: {
      marginTop: '0px',
      marginLeft: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    tipsContainer: {
      marginTop: '60px',
    },
    paypalIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    buttonContainer: {
      background: '#19295a',
      color: 'rgb(228, 155, 77)',
      marginTop: '20px',
      marginBottom: '20px',
      float: 'right',
    },
    buyNow: {
      background: '#19295A',
      color: 'rgb(228, 228, 228)',
      marginTop: '20px',
      marginBottom: '20px',
      float: 'right',
    },
    mainHeading: {
      fontWeight: 500,
    },
    labelAlign: {
      margin: 'auto',
    },
    subTotalContainer: {
      border: '1px solid black',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      background: '#f9f9f9',
      marginLeft: 60,
    },
    subTotalPrice: {
      float: 'right',
      display: 'inline-block',
      margin: '0 0 10px 0',
    },
    subTotalLabel: {
      float: 'left',
      display: 'inline-block',
      margin: '0 0 10px 0',
    },
    subTotalHr: {
      borderBottom: '1px solid grey',
      width: '100%',
    },
    buttonEndIcon: {
      '& .MuiButton-endIcon': {
        position: 'absolute',
        right: 8,
      },
    },
    modalHeader: {
      fontSize: 30,
      color: '#8caa35',
      fontFamily: 'serif',
      textAlign: 'center',
      margin: '40px 0 0 0',
    },
    modalBodyText: {
      fontFamily: 'serif',
      textAlign: 'center',
      color: 'grey',
    },
    modalBottomText: {
      fontSize: 20,
      fontFamily: 'serif',
      textAlign: 'center',
      margin: '30px 0 10px 0',
      color: 'grey',
    },
    confirmModal: {
      width: 600,
    },
    socialIcons: {
      textAlign: 'center',
      marginBottom: 30,
    },
    instagramIcon: {
      color: '#E7414F',
      fontSize: 40,
    },
    facebookIcon: {
      color: '#304E8D',
      fontSize: 40,
    },
    twitterIcon: {
      color: '#3FA2EB',
      fontSize: 40,
    },
    '@media (max-width: 959px)': {
      maxWidth: '960px',
      subTotalContainer: {
        marginLeft: 0,
      },
    },
  };
});

export default useStyles;
