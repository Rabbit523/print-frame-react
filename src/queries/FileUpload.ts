import { gql } from 'apollo-boost';
export const UPLOAD_FILE = gql`
  mutation upload($input: Upload!) {
    singleImageFileUpload(input: $input) {
      name
    }
  }
`;
export const UPLOAD_WALL_ART_FILE = gql`
  mutation upload($input: WallArtImageFileUpload!) {
    wallArtImageFileUpload(input: $input) {
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
