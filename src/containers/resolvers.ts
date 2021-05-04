/* eslint-disable @typescript-eslint/no-explicit-any */

export enum ItemType {
  IMAGE = 'IMAGE',
  FRAME = 'FRAME',
  FRAMED_IMAGE = 'FRAMED_IMAGE',
}
export interface CartItem {
  type: ItemType;
  id?: string;
  price: number;
  quantity: number;
  Thumbnail: string;
  name: string;
  width: number;
  height: number;
  shippingId?: string;
  shippingWidth?: number;
  shippingHeight?: number;
  shippingLength?: number;
  shippingWeight?: number;
  shippingPrice?: number;
  productId: string;
  scaledImage: string;
  rotate: number;
  isColor: string;
  selectedFrame: string;
  selectedSize: string;
  sizeInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
    __typename: 'size';
  };
  __typename?: string;
}

export interface ILocalImage {
  name: string;
  printMargin: number;
  printSizes: {
    id: string;
    width: string;
    height: string;
    price: number;
    framePrice: number;
    shippingWidth: number;
    shippingHeight: number;
    shippingWeight: number;
  };
}
export interface DiscountCode {
  value: number;
  type: string;
  __typename?: string;
}

const saveDiscountCode = (_root: any, { input }: { input: DiscountCode }, { cache }: { cache: any }): boolean => {
  cache.writeData({
    data: {
      discountCode: { ...input, __typename: 'discountCode' },
    },
  });
  return true;
};

const setUser = (
  _root: any,
  { input }: { input: { isAnonymous: boolean; uid: string } },
  { cache }: { cache: any },
): boolean => {
  try {
    cache.writeData({
      data: {
        user: {
          ...input,
          __typename: 'user',
        },
      },
    });
  } catch (e) {
    //TODO:Sentry
    console.log('save user error is', e);
  }

  return true;
};

const resolvers = {
  Mutation: {
    saveDiscountCode,
    setUser,
  },
};

export default resolvers;
