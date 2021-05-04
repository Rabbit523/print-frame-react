import { gql } from 'apollo-boost';
export const CONTACT_FORM_SUBMISSION = gql`
  mutation sendContact($input: contactFormInput!) {
    sendContactForm(input: $input)
  }
`;
