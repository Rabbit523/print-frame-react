import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    innerContentArea: {
      border: '1px solid #B4B4B4',
      padding: '15px',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    priceContainer: {
      fontSize: 11,
    },
    arrowDownIcon: {
      width: 15,
      height: 15,
    },
    radioWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      padding: '0 10px',
    },
    '& MuiTypography-body1': {
      fontSize: 14,
    },
    frame: {
      textAlign: 'center',
      border: '1px solid #ccc',
      borderRadius: ' 3px',
      background: '#f1f1f1',
      padding: '15px',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    frames: {
      width: '100%',
    },
    coloredImage: {
      width: '150px',
      height: '100px',
      margin: '30px 30px 10px 30px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    blackWhiteImage: {
      width: '150px',
      height: '100px',
      filter: 'grayscale(1)',
      margin: '30px 30px 10px 30px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    wallArtColoredImage: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    wallArtBlackWhiteImage: {
      width: '100%',
      filter: 'grayscale(1)',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    textHeading: {
      color: '#19295A',
      marginTop: '10px',
      fontSize: '26px',
      marginBottom: '0',
    },
    paragraph: {
      color: '#707070',
      fontSize: '18px',
    },
    DragIconSection: {
      display: 'inline-block',
      justifyContent: 'space-around',
      [theme.breakpoints.down('xs')]: {
        fontSize: 10,
      },
    },
    DragIconLabel: {
      display: 'inline-block',
    },
    orangeColor: {
      color: 'orange',
      display: 'inline-block',
      width: 15,
      height: 15,
    },
    radioContainer: {
      display: 'flex',
      justifyContent: 'baseline',
      flexDirection: 'row',
    },
    input: {
      display: 'inline-block',
      width: '50%',
      padding: '5px 0',
      marginLeft: 13,
      [theme.breakpoints.down('xs')]: {
        width: '75%',
      },
    },
    pZoom: {
      display: 'inline-block',
      fontSize: 10,
    },
    rotateContainer: {
      [theme.breakpoints.down('sm')]: {
        marginTop: 10,
      },
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      padding: '15px',
    },
    darkButton: {
      margin: '10px',
      backgroundColor: '#19295A',
      color: '#FABE69',
    },
    button: {
      margin: '10px',
      border: '2px solid #19295A',
    },
    checkoutButtonWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
    },
    frameIntro: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },
    hidden: {
      display: 'none',
    },
    imgSize: {
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    formControlLabel: {
      fontSize: '9px',
      '& label': {
        fontSize: '14px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    imgEditorTitle: {
      display: 'none',
      color: '#51660A',
      fontFamily: 'serif',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    formControl: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'flex',
        padding: '10px 0',
      },
    },
    selectLabel: {
      backgroundColor: 'white',
      marginTop: 10,
      color: '#FEB55F',
    },
    rightPrice: {
      float: 'right',
    },
    dropZone: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '10px solid black',
      minHeight: 'unset',
      marginBottom: 10,
      '& > div': {
        '& > p': {
          marginBottom: '0',
          color: 'black',
          fontSize: 15,
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        },
      },
      [theme.breakpoints.down('sm')]: {
        '& input': {
          display: 'none',
        },
      },
    },
    frameImage: {
      display: 'none',
      '& h1': {
        display: 'inline-block',
        color: 'gray',
      },
      '& p': {
        display: 'inline-block',
        color: '#556818',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        '& img': {
          width: '100%',
        },
      },
    },
    fabProgress: {
      position: 'relative',
      zIndex: 1,
      margin: 'auto',
    },
  }),
);

export const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);
export default useStyles;
