import gql from 'graphql-tag';

export const GET_MY_PRODUCTS = gql`
  query getMyOrders {
    getMyOrders {
      id
      orderId
      userId
      firstName
      lastName
      salutation
      paymentDate
      shipmentDate
      orderTotal
      orderFolder
      orderStatus
      shippingLableUrl
      shippingLableid
      createdAt
      shippingAddress {
        name
        street1
        street2
        city
        zipCode
        country
        state
      }
      billingAddress {
        name
        street1
        street2
        city
        zipCode
        country
        state
      }
      images {
        price
        isBlackAndWhite
        quantity
        width
        height
        imageData
        name
        createdAt
      }
      frames {
        frameName
        frameId
        width
        height
        shippingHeight
        shippingWidth
        shippingLength
        price
        shippingLableUrl
        shippingLableid
        shippingPrice
        quantity
      }
      framedImage {
        name
        imageData
        isBlackAndWhite
        frameName
        width
        height
        shippingHeight
        shippingWidth
        shippingLength
        price
        shippingLableUrl
        shippingLableid
        shippingPrice
        quantity
      }
    }
  }
`;

export const SUBMIT_MY_ORDER = gql`
  mutation submitIt($input: submitMyOrderInput!) {
    submitMyOrder(input: $input)
  }
`;

export const ADD_WALL_ART = gql`
  mutation addWall($input: AddWallArt!) {
    addWallArt(input: $input) {
      id
    }
  }
`;
export const GET_WALL_ART = gql`
  query getWallArt($input: GetWallArt!) {
    getWallArt(input: $input) {
      id
      name
      price
      images {
        id
        name
        price
        finalImageData
        quantity
        printWidth
        printHeight
        isBlackAndWhite
        frameName
      }
    }
  }
`;
