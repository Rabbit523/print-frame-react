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
    radioWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
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
      marginTop: '10px',
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
      [theme.breakpoints.down('xs')]: {
        width: 10,
        height: 10,
      },
    },
    radioContainer: {
      display: 'flex',
      justifyContent: 'baseline',
      flexDirection: 'row',
    },
    input: {
      display: 'inline-block',
      width: '60%',
      padding: '5px 0',
      marginLeft: 25,
    },
    pZoom: {
      display: 'inline-block',
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
      padding: '20px',
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
      fontSize: '14px',
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
      display: 'none',
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
