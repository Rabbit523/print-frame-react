import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
type Attention = {
  isOpen: boolean;
  onClose: Function;
  str: string;
};

export default function ErrorDialog({ isOpen, onClose, str }: Attention): JSX.Element {
  const { t } = useTranslation('ErrorDialog');
  const [open, setOpen] = useState(false);
  const handleClose = (): void => {
    setOpen(false);
    onClose();
  };
  const onContinue = (): void => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
          {t(str)}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" color="primary" autoFocus onClick={onContinue}>
            {t('Ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
