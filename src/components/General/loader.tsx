import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LoaderImage from '../../assets/img/spinner-transp.gif';

const useStyles = makeStyles(() => {
  const top = 50;
  const left = 50;

  return {
    paper: {
      position: 'absolute',
      width: '20%',
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      outline: 'none',
    },
    image: {
      border: 0,
      outline: 'none',
      width: '100%',
    },
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
});

const Loader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Modal className={classes.modal} open={true} data-testid="LoaderModal">
      <div className={classes.paper}>
        <img src={LoaderImage} className={classes.image} />
      </div>
    </Modal>
  );
};
export default Loader;
