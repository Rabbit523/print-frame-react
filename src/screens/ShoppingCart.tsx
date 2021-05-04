import React from 'react';
import Main from '../layouts/Main';
import Cart from '../components/ShoppingCart/index';

const ShoppingCart = (): JSX.Element => {
  return (
    <Main title="Shopping cart" description="you upload and we print it" pageId="TermsAndConditions">
      <Cart />
    </Main>
  );
};

export default ShoppingCart;
