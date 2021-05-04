import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';
import Route from '../utils/Route';

//There is no need to lazy load everything
import Home from './Home';
import TermsAndConditions from '../screens/TermsAndConditions';
import Loader from '../components/General/loader';
import PrivacyPolicy from './PrivacyPolicy';
import ReturnPolicy from './ReturnPolicy';
import EditWallArt from './EditWallArt';
import Prints from './Prints';
import PrintAndFrames from './PrintAndFrames';
import UploadFile from './UploadFile';
import FramesPage from './Frames';
import IndividualFrame from './IndividualFrame';
import ShippingPolicy from './ShippingPolicy';
import OrderConfirmation from './OrderConfirmation';
import ForgotPassword from './ForgotPassword';
import OrderHistory from './OrderHistory';
import ImageEditor from './EditImage';

const FourOFour = lazy(() => import('../components/General/fourOFour'));
const Login = lazy(() => import('./Login'));
const LogoutScreen = lazy(() => import('../components/LogoutScreen'));
const Faq = lazy(() => import('./Faq'));
const ShoppingCart = lazy(() => import('./ShoppingCart'));
const Shipping = lazy(() => import('./Shipping'));
const WallArt = lazy(() => import('./WallArt'));

const MainRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Router primary={false}>
        <Route component={Home} path="/" />
        <Route component={UploadFile} path="uploader" />
        <Route component={Login} path="login" />
        <Route component={LogoutScreen} path="logout" />
        <Route component={FramesPage} path="frames" />
        <IndividualFrame path="frames/:FrameId" />
        <Route component={ForgotPassword} path="forgot-password" />
        <Route component={TermsAndConditions} path="terms-and-conditions" />
        <Route component={PrivacyPolicy} path="privacy-policy" />
        <Route component={Faq} path="faq" />
        <Route component={ShoppingCart} path="cart" />
        <Route component={Shipping} path="shipping" />
        <Route component={ReturnPolicy} path="return-policy" />
        <Route component={ShippingPolicy} path="shipping-policy" />
        <ImageEditor path="image-editor" />
        <ImageEditor path="image-editor/:imageId" />
        <EditWallArt path="wall-art/:wallArtType/:wallArtID" />
        <EditWallArt path="wall-art/:wallArtType" />
        <Route component={Prints} path="prints" />
        <Route component={PrintAndFrames} path="print-frames" />
        <Route component={OrderConfirmation} path="order-confirmation" />
        <Route component={OrderHistory} path="order-history" />
        <Route component={FourOFour} default />
        <Route component={WallArt} path="wall-art" />
      </Router>
    </Suspense>
  );
};

export default MainRoutes;
