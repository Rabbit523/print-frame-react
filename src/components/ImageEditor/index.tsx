import React, { useEffect, useRef, ChangeEvent, useReducer, useLayoutEffect, useState } from 'react';
import { Button, Grid, Radio, RadioGroup, FormControlLabel } from '@material-ui/core/';
import FrameChoices from './FrameChoices';
import { useTranslation } from 'react-i18next';
import DragIcon from '@material-ui/icons/OpenWith';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_MY_IMAGE } from '../../queries/images';
import { navigate } from '@reach/router';
import { GET_ALL_PRODUCTS, UPDATE_MY_ORDER_IMAGE } from '../../queries/products';
import Loader from '../General/loader';
import { cloudinaryCtx } from '../../utils/cloudinary';
import AvatarEditor from 'react-avatar-editor';
import { css } from 'emotion';
import useStyles, { PrettoSlider } from './styles';
import Typography from '@material-ui/core/Typography';
import * as Sentry from '@sentry/browser';
import PrintSizes from './PrintSizes';
import Navigation from './Navigations';
import MobileOptions from './MobileOptions';
import { FrameType, ImagePrintSize, FrameSize } from '../../types/';
import { ItemType } from '../../containers/resolvers';
interface EditorState {
  selectedFrame: string;
  selectedSize: string;
  scale: number;
  isColor: string;
  imgWidth: number;
  imgHeight: number;
  imageBase64: string;
  base64: string;
  base64GrayScale: string;
  FrameUrl: string;
  rotate: number;
  Frames: any;
  printSizes: any;
  printMargin: number;
  frameBorderWidth: number;
  frameBorderImageWidth: number;
  frameBorderOutset: number;
  name: string;
  redirectLocation: string;
  saveLoading: boolean;
}

const initialState: EditorState = {
  selectedFrame: '0',
  rotate: 0,
  selectedSize: '',
  scale: 1,
  isColor: 'full-color',
  imgWidth: 15,
  imgHeight: 15,
  imageBase64: '',
  Frames: [],
  FrameUrl: '#',
  printSizes: [],
  printMargin: 0,
  frameBorderWidth: 0,
  frameBorderImageWidth: 0,
  frameBorderOutset: 0,
  base64: '',
  base64GrayScale: '',
  name: '',
  redirectLocation: '',
  saveLoading: false,
};

const EditorReducer = (state: EditorState, action: any): EditorState => {
  switch (action.type) {
    case 'sizeChange':
      return {
        ...state,
        selectedSize: action.size,
        imgWidth: action.width,
        imgHeight: action.height,
      };
    case 'InitState':
      return {
        ...state,
        selectedSize: action.size,
        imgWidth: action.width,
        imgHeight: action.height,
        printSizes: action.printSizes,
        imageBase64: action.base64,
        base64: action.base64,
        base64GrayScale: action.base64GrayScale,
        name: action.name,
      };

    case 'InitFrames':
      return {
        ...state,
        Frames: action.Frames,
      };
    case 'changeColor':
      return {
        ...state,
        imageBase64: action.value === 'full-color' ? state.base64 : state.base64GrayScale,
        isColor: action.value,
      };
    case 'Rotate':
      return {
        ...state,
        rotate: action.value,
      };
    case 'Scale':
      return {
        ...state,
        scale: action.value,
      };
    case 'frameChange':
      return {
        ...state,
        selectedFrame: action.value,
        FrameUrl: action.url,
        frameBorderWidth: action.frameBorderWidth,
        frameBorderImageWidth: action.frameBorderImageWidth,
        frameBorderOutset: action.frameBorderOutset,
      };
    case 'UpdateRedirect':
      return {
        ...state,
        redirectLocation: action.location,
        saveLoading: true,
      };
    default:
      return { ...state };
  }
};

const useWindowSize = (): any => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize(): void {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
const Canvas = ({ imageId }: { imageId: string }): JSX.Element => {
  const windowSize = useWindowSize();

  const { t } = useTranslation('ImageUploader');
  const classes = useStyles();
  const { data: FrameData, loading, error: ProductError } = useQuery(GET_ALL_PRODUCTS);
  const Base64Img = useQuery(GET_MY_IMAGE, { variables: { input: imageId } });
  const [state, dispatch] = useReducer(EditorReducer, initialState);
  const {
    selectedFrame,
    selectedSize,
    rotate,
    scale,
    isColor,
    imgWidth,
    imgHeight,
    imageBase64,
    Frames,
    FrameUrl,
    printSizes,
    printMargin,
    frameBorderWidth,
    frameBorderImageWidth,
    frameBorderOutset,
    base64,
    base64GrayScale,
    name,
    redirectLocation,
    saveLoading,
  } = state;
  //DO NOT change this factor as it affect server side frames
  const frameFactor = windowSize[0] > 960 ? Math.ceil(windowSize[0] / 150) : Math.ceil(windowSize[0] / 50);

  const [saveItem, { error: addError }] = useMutation(UPDATE_MY_ORDER_IMAGE, {
    onCompleted: () => {
      navigate(redirectLocation);
    },
  });
  const onSizeChange = (id: string): void => {
    const item = Base64Img.data.getMyImage.printSizes.find((item: ImagePrintSize) => item.id === id);
    dispatch({
      type: 'sizeChange',
      size: item.id,
      height: item.height,
      width: item.width,
    });
  };
  const onFrameChange = (id: string): void => {
    let url = '#';
    const item = FrameData.getAllProducts.products.find((item: FrameType) => {
      return item.id === id;
    });
    if (item) {
      url = cloudinaryCtx.url(item.FramedImageThumbnail, {
        width: Math.ceil(20 * 15),
        height: Math.ceil(24 * 15),
        crop: 'scale',
      });
    }
    dispatch({
      type: 'frameChange',
      value: id,
      url,
      frameBorderWidth: id === '0' ? 0 : item.FrameBorderWidth,
      frameBorderImageWidth: id === '0' ? 0 : item.FrameImageBorderWidth,
      frameBorderOutset: id === '0' ? 0 : item.FrameImageOutset,
    });
  };

  const editorRef = useRef<any>();
  if (ProductError || Base64Img.error || addError) {
    console.log('addError', JSON.stringify(addError, null, 4));
    Base64Img.error && Sentry.captureException(Base64Img.error);
    ProductError && Sentry.captureException(ProductError);
    addError && Sentry.captureException(addError);
    navigate('/');
  }

  useEffect(() => {
    if (!FrameData || !Base64Img.data) return;
    dispatch({ type: 'InitFrames', Frames: FrameData.getAllProducts.products });
    const data = Base64Img.data.getMyImage;
    if (data.printSizes.length !== 0) {
      dispatch({
        type: 'InitState',
        size: data.printSizes[0].id,
        height: data.printSizes[0].height,
        width: data.printSizes[0].width,
        printSizes: data.printSizes,
        base64: data.base64,
        base64GrayScale: data.base64GrayScale,
        name: data.name,
      });
    }
    if (data.isBlackAndWhite) dispatch({ type: 'changeColor', value: 'blackwhite' });
    else dispatch({ type: 'changeColor', value: 'full-color' });
    dispatch({
      type: 'InitImage',
      base64: data.base64,
      base64GrayScale: data.base64GrayScale,
      name: data.name,
    });
    const size = data.printSizes.find((size: FrameSize) => {
      return size.width === data.printWidth && size.height === data.printHeight;
    });
    if (size) onSizeChange(size.id);
    const product = FrameData.getAllProducts.products.find((product: FrameType) => {
      return product.productName === data.frameName;
    });
    if (product) onFrameChange(product.id);
  }, [Base64Img.data, FrameData]);

  if (loading || Base64Img.loading || saveLoading) return <Loader />;

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'changeColor', value: event.target.value });
  };

  const handleScaleChange = (value: number): void => {
    dispatch({ type: 'Scale', value });
  };

  const rotatePic = (direction: string): void => {
    let value: number;
    if (direction === 'left') {
      value = rotate === 0 ? 270 : rotate - 90;
    } else {
      value = rotate === 270 ? 0 : rotate + 90;
    }
    dispatch({
      type: 'Rotate',
      value,
    });
  };

  const saveImage = (location: string): void => {
    dispatch({
      type: 'UpdateRedirect',
      location,
    });
    const editor = editorRef.current;
    if (editor) {
      const scaledImage = editor.getImageScaledToCanvas().toDataURL();
      const sizeInfo = editor.getCroppingRect();
      const item: ImagePrintSize = printSizes.find((item: ImagePrintSize) => item.id === selectedSize);
      let shippingInfo = {};
      if (selectedFrame === '0') {
        shippingInfo = {
          shippingWidth: item.shippingWidth,
          shippingHeight: item.shippingHeight,
          shippingWeight: item.shippingWeight,
          shippingLength: item.shippingLength,
        };
      } else {
        const frame = Frames.find((item: FrameType) => item.id === selectedFrame);
        const selectedSize = frame.sizes.find(
          (size: ImagePrintSize) => size.width === item.width && size.height === item.height,
        );
        shippingInfo = {
          shippingWidth: selectedSize.shippingWeight,
          shippingHeight: selectedSize.shippingHeight,
          shippingWeight: selectedSize.shippingWeight,
          shippingLength: selectedSize.shippingLength,
        };
      }
      const SavedObject = {
        type: selectedFrame === '0' ? ItemType.IMAGE : ItemType.FRAMED_IMAGE,
        name: name,
        sizeInfo: { ...sizeInfo },
        width: item.width,
        height: item.height,
        scaledImage,
        quantity: 1,
        ...shippingInfo,
        rotate,
        isColor,
        selectedFrame,
        selectedSize,
        frameFactor,
        price: selectedFrame === '0' ? item.price : item.framePrice,
      };
      saveItem({ variables: { input: SavedObject } });
    }
  };

  return (
    <Grid container spacing={3} className={classes.innerContentArea}>
      <PrintSizes onSizeChange={onSizeChange} classes={classes} selectedSize={selectedSize} printSizes={printSizes} />
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div
          className={classes.frame}
          style={{
            height: imgHeight * frameFactor + 150,
          }}
        >
          <div
            style={{
              alignSelf: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
            }}
          >
            <div
              style={{ height: imgHeight * frameFactor + 30 * 2 }}
              className={css`
                top: 0;
                left: 0;
                border: ${frameBorderWidth}px solid;
                border-image: url(${FrameUrl}) ${frameBorderImageWidth} ${frameBorderOutset} stretch;
              `}
            >
              {imageBase64 && (
                <AvatarEditor
                  image={imageBase64}
                  width={imgWidth * frameFactor}
                  height={imgHeight * frameFactor}
                  border={printMargin}
                  color={[255, 255, 255, 0.8]}
                  scale={scale}
                  rotate={rotate}
                  ref={editorRef}
                />
              )}
            </div>
          </div>
        </div>
        <Grid container>
          <Grid item xs={12} sm={10} className={classes.DragIconSection}>
            <DragIcon className={classes.orangeColor} />
            <p className={classes.DragIconLabel}>{t('PrintingArea')}</p>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.pZoom}>{t('Zoom')}</p>
            <PrettoSlider
              className={classes.input}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={scale}
              min={1}
              max={2}
              step={0.1}
              onChange={(e: ChangeEvent<{}>, value: number | number[]): void => handleScaleChange(value as number)}
            />
          </Grid>
          <Grid className={classes.rotateContainer} item xs={12}>
            <p className={classes.pZoom}>{t('Rotate')}</p>
            <Button
              variant="contained"
              color="primary"
              className={classes.darkButton}
              onClick={(): void => rotatePic('Left')}
            >
              {t('Left')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.darkButton}
              onClick={(): void => rotatePic('right')}
            >
              {t('Right')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Grid>
          <RadioGroup
            aria-label="gender"
            value={isColor}
            onChange={handleColorChange}
            className={classes.radioContainer}
          >
            <div className={classes.radioWrapper}>
              <img src={base64} className={classes.coloredImage} />
              <FormControlLabel
                value="full-color"
                control={<Radio />}
                label={<Typography className={classes.formControlLabel}>{t('FullColor')}</Typography>}
              />
            </div>
            <div className={classes.radioWrapper}>
              <img src={base64GrayScale} className={classes.blackWhiteImage} />
              <FormControlLabel
                value="blackwhite"
                control={<Radio />}
                label={<Typography className={classes.formControlLabel}>{t('BlackWhite')}</Typography>}
              />
            </div>
          </RadioGroup>
        </Grid>
        <MobileOptions
          classes={classes}
          printSizes={printSizes}
          onSizeChange={onSizeChange}
          selectedSize={selectedSize}
          products={Frames}
          selectedFrame={selectedFrame}
          onFrameChange={onFrameChange}
        />
        <FrameChoices onFrameChange={onFrameChange} selectedFrame={selectedFrame} />
      </Grid>
      {printSizes.length !== 0 && <Navigation classes={classes} saveImage={saveImage} />}
    </Grid>
  );
};

export default Canvas;
