import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    user @client {
      isAnonymous
      uid
    }
  }
`;
export const SAVE_USER = gql`
  mutation saveUser($input: userInfo!) {
    setUser(input: $input) @client
  }
`;

export const CHANGE_ORDER_UID = gql`
  mutation changeUid($input: OrderUidInput!) {
    changeOrderUid(input: $input)
  }
`;
