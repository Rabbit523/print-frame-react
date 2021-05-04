import gql from 'graphql-tag';

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts(input: { offset: 0, limit: 10 }) {
      total
      products {
        id
        Thumbnail
        FramedImageThumbnail
        uri
        productName
        FrameImageBorderWidth
        FrameBorderWidth
        FrameImageOutset
        images {
          imageUrl
        }
        sizes {
          width
          height
          price
          shippingWidth
          shippingHeight
          shippingLength
          shippingWeight
        }
        productDescription
      }
    }
  }
`;
export const GET_PRODUCT_BY_URI = gql`
  query getProduct($input: String!) {
    getProductByUri(input: $input) {
      id
      Thumbnail
      uri
      productName
      images {
        imageUrl
      }
      sizes {
        id
        width
        height
        price
        shippingWidth
        shippingHeight
        shippingLength
        shippingWeight
      }
      productDescription
    }
  }
`;

export const GET_MY_ITEMS = gql`
  query myItems {
    getMyOrderItems {
      images {
        id
        name
        price
        finalImageData
        quantity
        printWidth
        printHeight
      }
      frames {
        id
        width
        height
        quantity
        thumbnail
        quantity
        price
      }
      wallArts {
        id
        name
        price
        quantity
        images {
          id
          name
          price
          finalImageData
          quantity
          printWidth
          printHeight
        }
      }
      shippingAddress {
        name
        street1
        street2
        city
        state
        country
        zipCode
      }
      billingAddress {
        name
        street1
        street2
        city
        state
        country
        zipCode
      }
      total
      shippingPrice
      DiscountCode
      DiscountValue
      discountCodeType
      email
    }
  }
`;

export const GET_MY_ADDRESS = gql`
  query myAddress {
    getMyAddress {
      shippingAddress {
        name
        street1
        street2
        city
        state
        country
        zipCode
      }
      billingAddress {
        name
        street1
        street2
        city
        state
        country
        zipCode
      }
      userEmail
      phoneNumber
      firstName
      lastName
    }
  }
`;

export const ADD_FRAME_TO_CART = gql`
  mutation addItToCart($input: AddFrameInput!) {
    addFrameToMyOrder(input: $input)
  }
`;

export const UPDATE_MY_ORDER_IMAGE = gql`
  mutation updateOrder($input: UpdateMyOrderImageInput!) {
    updateMyOrderImage(input: $input)
  }
`;

export const UPDATE_MY_WALL_ART_IMAGE = gql`
  mutation updateWallArt($input: UpdateMyWallArtImageInput!) {
    updateMyWallArtImage(input: $input)
  }
`;

export const REMOVE_MY_WALL_ART = gql`
  mutation removeWallArt($input: RemoveWallArt!) {
    removeWallArt(input: $input)
  }
`;
export const REMOVE_MY_ORDER_ITEM = gql`
  mutation removeItem($input: removeMyOrderItemInput!) {
    removeMyOrderItem(input: $input)
  }
`;

export const UPDATE_MY_ORDER_ITEM_QUANTITY = gql`
  mutation updateItemQuantity($input: updateMyOrderItemQuantityInput!) {
    updateMyOrderItemQuantity(input: $input)
  }
`;

export const UPDATE_MY_WALL_ART_QUANTITY = gql`
  mutation updateWallArtQuantity($input: updateMyWallArtQuantityInput!) {
    updateMyWallArtQuantity(input: $input)
  }
`;
