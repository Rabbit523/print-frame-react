export interface FrameType {
  id: string;
  productName: string;
  productSku: string;
  productDescription?: string;
  productPrice: number;
  productQuantity?: number;
  Thumbnail: string;
  FrameImage: string;
  FrameImageBorderWidth: number;
  FrameBorderWidth: number;
  FrameImageOutset: number;
  images: [FrameImage];
  sizes: [FrameSize];
  __typename: string;
}
export interface FrameImage {
  __typename: string;
  imageUrl: string;
}
export interface FrameSize {
  width: number;
  height: number;
  price: number;
  shippingWidth: number;
  shippingHeight: number;
  shippingLength: number;
  shippingWeight: number;
  __typename: string;
}

export interface ImageType {
  name: string;
  base64: string;
  base64GrayScale: string;
  printMargin: number;
  printSizes: [ImagePrintSize];
  __typename: string;
}

export interface ImagePrintSize {
  id: string;
  width: number;
  height: number;
  price: number;
  framePrice: number;
  shippingWidth: number;
  shippingHeight: number;
  shippingWeight: number;
  shippingLength: number;
  __typename: string;
}

export interface ImageInfo {
  name: string;
  printMargin: number;
  printSizes: {
    id: string;
    width: number;
    height: number;
    price: number;
    framePrice: number;
    shippingWidth: number;
    shippingHeight: number;
    shippingLength: number;
    shippingWeight: number;
  };
  __typename: string;
}
