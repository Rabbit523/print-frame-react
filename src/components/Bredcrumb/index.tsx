import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
    },
    mobileStep: {
      width: '40%',
      display: 'none',
    },
    mobileStepperLabel: {
      display: 'none',
      background: '#fafafa',
      padding: 8,
      width: '60%',
    },
    mobileStepperIcon: {
      display: 'none',
      color: '#3f51b5',
      background: '#fafafa',
      width: '10%',
    },
    windowsStepper: {
      display: 'flex',
    },
    '@media (max-width: 749px)': {
      maxWidth: '750px',
      mobileStep: {
        display: 'inline-block',
      },
      mobileStepperLabel: {
        display: 'inline-block',
      },
      mobileStepperIcon: {
        display: 'inline-block',
      },
      windowsStepper: {
        display: 'none',
      },
    },
  };
});
const getSteps = (t: (str: string) => string): Array<{ title: string }> => [
  {
    title: t('UploadImage'),
  },
  {
    title: t('SelectSize'),
  },
  {
    title: t('Frames'),
  },
  {
    title: t('Checkout'),
  },
];
export enum ImageSteps {
  UploadImage = 0,
  SelectSize = 1,
  CheckOut = 3,
}
export const ImageBreadcrumb = ({ activeStep }: { activeStep: ImageSteps }): JSX.Element => {
  const { t } = useTranslation('Breadcrumb');
  const classes = useStyles();
  const steps = getSteps(t).map(item => {
    return item.title;
  });

  return (
    <div className={classes.root} data-testid="Breadcrumb">
      <MobileStepper
        className={classes.mobileStep}
        steps={steps.length}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" disabled={true} style={{ display: 'none' }}>
            {t('Next')}
          </Button>
        }
        backButton={
          <Button size="small" disabled={true} style={{ display: 'none' }}>
            {t('Prev')}
          </Button>
        }
      />
      <p className={classes.mobileStepperLabel}>{steps[activeStep]}</p>
      <Stepper className={classes.windowsStepper} alternativeLabel activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
export enum CheckoutSteps {
  cart = 0,
  addrress = 1,
  shipping = 2,
  conrimation = 3,
}
const getCheckoutSteps = (t: (str: string) => string): Array<{ title: string }> => [
  {
    title: t('Cart'),
  },
  {
    title: t('AddressInput'),
  },
  {
    title: t('SelectShipping'),
  },
  {
    title: t('Confirmation'),
  },
];
export const CheckoutBreadcrumb = ({ activeStep }: { activeStep: CheckoutSteps }): JSX.Element => {
  const { t } = useTranslation('Breadcrumb');
  const classes = useStyles();
  const steps = getCheckoutSteps(t).map(item => {
    return item.title;
  });

  return (
    <div className={classes.root} data-testid="Breadcrumb">
      <MobileStepper
        className={classes.mobileStep}
        steps={steps.length}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={<Button size="small" disabled={true} style={{ display: 'none' }}></Button>}
        backButton={<Button size="small" disabled={true} style={{ display: 'none' }}></Button>}
      />
      <p className={classes.mobileStepperLabel}>{steps[activeStep]}</p>

      <Stepper className={classes.windowsStepper} alternativeLabel activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
