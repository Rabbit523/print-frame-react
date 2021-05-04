import { gql } from 'apollo-boost';

export const GET_MY_ORDER_IMAGES = gql`
  query getAllMyImages {
    getAllMyImages {
      name
      base64
    }
  }
`;
export const GET_MY_IMAGE = gql`
  query myImg($input: String!) {
    getMyImage(input: $input) {
      name
      base64
      base64GrayScale
      frameName
      printHeight
      printWidth
      isBlackAndWhite
      printSizes {
        id
        width
        height
        price
        framePrice
        shippingWidth
        shippingHeight
        shippingWeight
        shippingLength
      }
    }
  }
`;
export const GET_MY_WALL_ART_IMAGE = gql`
  query getMyWallArtImage($input: GetWallArtImage!) {
    getMyWallArtImage(input: $input) {
      name
      base64
      base64GrayScale
      frameName
      isBlackAndWhite
      printSizes {
        id
        width
        height
        price
        framePrice
        shippingWidth
        shippingHeight
        shippingWeight
        shippingLength
      }
    }
  }
`;
