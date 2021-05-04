interface ShippingAddress {
  name: string;
  street1: string;
  street2: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
}
interface Images {
  price: string;
  isBlackAndWhite: boolean;
  quantity: number;
  width: number;
  height: number;
  imageData: string;
  name: string;
  createdAt: string;
}
interface Frames {
  frameName: string;
  frameId: string;
  width: number;
  height: number;
  shippingHeight: number;
  shippingWidth: number;
  shippingLength: number;
  price: number;
  shippingLableUrl: string;
  shippingLableid: string;
  shippingPrice: number;
  quantity: number;
}
interface FramedImage {
  name: string;
  imageData: string;
  isBlackAndWhite: boolean;
  frameName: string;
  width: number;
  height: number;
  shippingHeight: number;
  shippingWidth: number;
  shippingLength: number;
  price: number;
  shippingLableUrl: string;
  shippingLableid: string;
  shippingPrice: number;
  quantity: number;
}
export interface Order {
  orderId: string;
  userId: string;
  createdAt: string;
  orderStatus: string;
  shippingLableUrl: string;
  shippingLableid: string;
  shippingAddress: ShippingAddress[];
  billingAddress: ShippingAddress[];
  images: Images[];
  frames: Frames[];
  framedImage: FramedImage[];
}
