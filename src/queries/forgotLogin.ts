import { gql } from 'apollo-boost';
export const FORGOT_LOGIN = gql`
  mutation forgotLogin($input: InputForgotLogin!) {
    InputForgotLogin(input: $input)
  }
`;
