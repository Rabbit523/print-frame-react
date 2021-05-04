import gql from 'graphql-tag';

const typeDefs = gql`
  input discountCode {
    value: Int!
    type: string!
  }

  extend type Query {
    isLoggedIn: Boolean!
  }
  input userInfo {
    isAnonymous: Boolean!
    uid: String!
  }

  extend type Mutation {
    saveDiscountCode(input: discountCode!): Booolean
    setUser(input: userInfo!): Boolean!
  }
`;
export default typeDefs;
