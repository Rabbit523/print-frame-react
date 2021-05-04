import React from 'react';
import Main from '../layouts/Main';
import Confirmation from '../components/Confirmation';
const OrderConfirmation = (): JSX.Element => {
  return (
    <Main title="Confirm Payment" description="you upload and we print it" pageId="TermsAndConditions">
      <Confirmation />
    </Main>
  );
};
export default OrderConfirmation;
