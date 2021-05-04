import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

interface ModalProps {
  show: boolean;
  hideModal: () => void;
  children: JSX.Element;
}
const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
    },

    modalmain: {
      position: 'fixed',
      background: 'white',
      width: '80%',
      height: 'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },

    displayblock: {
      display: 'block',
    },

    displaynone: {
      display: 'none',
    },
  }),
);
const Modal = ({ show, hideModal }: ModalProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={show ? `${classes.modal} ${classes.displayblock}` : `${classes.modal} ${classes.displaynone}`}>
      <section className="modal-main">
        <p>Modal</p>
        <p>Data</p>

        <button onClick={hideModal}>close</button>
      </section>
    </div>
  );
};
export default Modal;
