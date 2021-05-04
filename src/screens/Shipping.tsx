import React from 'react';
import Main from '../layouts/Main';
import Shipping from '../components/ShippingInfo/';

const ShoppingCart = (): JSX.Element => {
  return (
    <Main title="Shipping " description="you upload and we print it" pageId="Shipping">
      <Shipping />
    </Main>
  );
};

export default ShoppingCart;
