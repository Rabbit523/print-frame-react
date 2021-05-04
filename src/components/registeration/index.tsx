import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import useWindowDimensions from './helper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CancelIcon from '@material-ui/icons/Cancel';
import { Grid, Checkbox, Button } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import CommuteIcon from '@material-ui/icons/Commute';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
      height: '100%',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: '60vw',
      height: 'auto',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
    },
    floatbut: {
      width: 25,
      height: 25,
      borderRadius: 20,
      backgroundColor: 'white',
      position: 'absolute',
      top: -10,
      right: -10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: '2px',
    },
    title: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: '30px',
    },
    content: {
      backgroundColor: 'grey',
      alignItems: 'center',
      height: '90vh',
    },
    root: {
      flexGrow: 1,
    },
    papertwo: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    formicon: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    iconstyle: {
      marginRight: '10px',
    },
    imputContainer: {},
    margin: {
      margin: theme.spacing(3),
      width: '80%',
    },
    margins: {
      margin: theme.spacing(2),
    },
    divcontainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageiconstyle: {
      height: 'auto',
      width: '60px',
      padding: '10px',
    },
    inputcolor: {
      color: '#FF7F26',
    },
    flexcontainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
    flexcontainertwo: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonstyle: {
      display: 'flex',
      justifyContent: 'center',
      height: 'auto',
    },
    gridpadding: {
      padding: '35px',
      marginTop: '19px',
      // [theme.breakpoints.down("md")]: {
      //   padding: "0px"
      // }
    },
    iconmargin: {
      margin: '12px',
    },
    inputlabelmargin: {
      fontSize: '20px',
    },
    labelfollowus: {
      margin: '1vh',
      color: '#c6f167',
    },
  }),
);

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Register
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        style={{ display: width < 600 ? 'block' : 'flex' }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper} style={{ width: width < 600 ? 'auto' : '60vw', position: 'relative' }}>
          <Grid container>
            <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
              <label className={classes.title}>Register</label>
            </Grid>

            <Grid item xs={12} sm={6} className={classes.flexcontainer}>
              <Grid container className={classes.gridpadding}>
                <Grid item xs={12} className={classes.margins}>
                  <div className={classes.divcontainer}>
                    <LocalOfferIcon className={classes.iconstyle} />
                    <InputLabel className={classes.inputlabelmargin}>Recieve Offers and Coupans</InputLabel>
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.margins}>
                  <div className={classes.divcontainer}>
                    <CommuteIcon className={classes.iconstyle} />
                    <InputLabel className={classes.inputlabelmargin}>Track and follow your orders</InputLabel>
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.margins}>
                  <div className={classes.divcontainer}>
                    <SettingsIcon className={classes.iconstyle} />
                    <InputLabel className={classes.inputlabelmargin}>Manage your account settings</InputLabel>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={classes.margin}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InputLabel>Ouick Access with</InputLabel>
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.flexcontainer}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={require('../../assets/img/fb.png')} className={classes.imageiconstyle} />
                    <img src={require('../../assets/img/go.png')} className={classes.imageiconstyle} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item lg={4} sm={4} xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <InstagramIcon color={'primary'} className={classes.iconstyle} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4} className={classes.flexcontainertwo}>
                  <FacebookIcon color={'primary'} className={classes.iconstyle} />
                </Grid>
                <Grid item lg={4} sm={4} xs={4}>
                  <TwitterIcon color={'primary'} className={classes.iconstyle} />
                </Grid>
                <Grid item xs={12} className={classes.flexcontainertwo}>
                  <InputLabel className={classes.labelfollowus}> Follow Us </InputLabel>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.margin}
                    placeholder="User Name"
                    id="input-with-icon-textfield"
                    InputProps={{
                      classes: { input: classes.inputcolor },
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.margin}
                    placeholder="Email"
                    id="input-with-icon-textfield"
                    InputProps={{
                      classes: { input: classes.inputcolor },
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    className={classes.margin}
                    placeholder="Password"
                    id="input-with-icon-textfield"
                    InputProps={{
                      classes: { input: classes.inputcolor },
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Checkbox
                      checked={check}
                      onChange={() => (check ? setCheck(false) : setCheck(true))}
                      value="checkedB"
                      color="primary"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                    />
                    <InputLabel style={{ alignSelf: 'center' }}>I agree to the </InputLabel>
                    <InputLabel
                      style={{
                        alignSelf: 'center',
                        marginLeft: '2px',
                        color: '#7FFF00',
                      }}
                    >
                      Terms & Condition
                    </InputLabel>
                  </div>
                </Grid>
                <Grid item xs={12} className={classes.margin}>
                  <div className={classes.buttonstyle}>
                    <Button variant="contained" color="primary" style={{ color: '#7FFF00' }}>
                      Get started
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <CancelIcon
            className={classes.floatbut}
            onClick={handleClose}
            style={{
              top: width < 600 ? '21px' : '-10px',
              right: width < 600 ? '4px' : '-10px',
            }}
          >
            aa
          </CancelIcon>
        </div>
      </Modal>
    </div>
  );
}
