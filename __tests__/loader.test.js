import React from 'react';
import { render } from '@testing-library/react';
import Loader from './../src/components/General/loader';
describe('Loader', () => {
  test('loader', async () => {
    const { getByTestId } = render(<Loader />);
    const modal = await getByTestId('LoaderModal');
    expect(modal).toBeTruthy();
  });
});
