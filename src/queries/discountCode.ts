import gql from 'graphql-tag';

export const IS_VALID_DISCOUNT_CODE = gql`
  mutation isValidDiscountCode($input: DiscountCodeExist!) {
    isValidDiscountCode(input: $input) {
      value
      type
    }
  }
`;
