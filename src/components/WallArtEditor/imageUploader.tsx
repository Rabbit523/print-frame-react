import React, {
  useReducer,
  useState,
  useRef,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useEffect,
} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles, { PrettoSlider } from './styles';
import AvatarEditor from 'react-avatar-editor';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { UPDATE_MY_WALL_ART_IMAGE } from '../../queries/products';
import DragIcon from '@material-ui/icons/OpenWith';
import { FrameType, ImagePrintSize } from '../../types/';
import { ItemType } from '../../containers/resolvers';
import { DropzoneArea } from 'material-ui-dropzone';
import { UPLOAD_WALL_ART_FILE } from '../../queries/FileUpload';
import { GET_MY_WALL_ART_IMAGE } from '../../queries/images';
import Loader from '../General/loader';
import { css } from 'emotion';
import { cloudinaryCtx } from '../../utils/cloudinary';
import ErrorDialog from '../../components/General/ErrorDialog';
interface EditorState {
  filename: string;
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
  frameFactor: number;
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
  filename: '',
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
  frameFactor: 15,
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
    case 'FileName':
      return {
        ...state,
        filename: action.value,
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
    case 'UpdateFactor':
      return {
        ...state,
        frameFactor: action.value,
      };
    default:
      return { ...state };
  }
};
type ImageUploaderProps = {
  width: number;
  height: number;
  imageFilename: string;
  currentWallArtID: string;
  currentImageNo: number;
  FramesProps: any;
  currentSelectedFrame: string;
  setUploadedFlag: Function;
  successfullySaved: Function;
};
const imageUploader = forwardRef(
  (
    {
      width,
      height,
      currentWallArtID,
      currentImageNo,
      FramesProps,
      currentSelectedFrame,
      setUploadedFlag,
      successfullySaved,
      imageFilename,
    }: ImageUploaderProps,
    ref,
  ) => {
    const { t } = useTranslation('ImageUploader');
    const classes = useStyles();
    const [state, dispatch] = useReducer(EditorReducer, initialState);
    const {
      filename,
      selectedFrame,
      selectedSize,
      rotate,
      scale,
      isColor,
      imageBase64,
      FrameUrl,
      frameFactor,
      printSizes,
      printMargin,
      frameBorderWidth,
      frameBorderImageWidth,
      frameBorderOutset,
      name,
    } = state;
    const [isUploaded, setIsUploaded] = useState(false);
    const [isErrorOpen, setErrorIsOpen] = useState(false);
    const client = useApolloClient();
    const [uploadFile, uploadingFile] = useMutation(UPLOAD_WALL_ART_FILE, {
      onCompleted: info => {
        dispatch({ type: 'FileName', value: info.wallArtImageFileUpload.filename });
        const data = info.wallArtImageFileUpload;
        const currentColor = isColor;
        if (data) {
          let printSizeIndex = -1;
          for (let i = 0; i < data.printSizes.length; i++) {
            if (data.printSizes[i].width === width && data.printSizes[i].height === height) printSizeIndex = i;
          }
          if (printSizeIndex == -1) {
            setErrorIsOpen(true);
            dispatch({ type: 'FileName', value: '' });
            return;
          }
          dispatch({
            type: 'InitState',
            size: data.printSizes[printSizeIndex].id,
            height: data.printSizes[printSizeIndex].height,
            width: data.printSizes[printSizeIndex].width,
            printSizes: data.printSizes,
            base64: data.base64,
            base64GrayScale: data.base64GrayScale,
            name: data.name,
          });
          dispatch({ type: 'changeColor', value: currentColor });
          dispatch({ type: 'InitFrames', Frames: FramesProps });
          setIsUploaded(true);
          setUploadedFlag(true, currentImageNo);
        }
      },
      onError: () => {
        setErrorIsOpen(true);
        dispatch({ type: 'FileName', value: '' });
      },
    });
    const [saveItem, updatingImage] = useMutation(UPDATE_MY_WALL_ART_IMAGE, {
      onCompleted: () => {
        successfullySaved();
      },
    });
    const [WindowMode, SetWindowMode] = useState('window');
    const editorRef = useRef<any>();
    useLayoutEffect(() => {
      function updateSize(): void {
        let scale = 0;
        if (window.innerWidth < 600) {
          scale = window.innerWidth / 25;
          SetWindowMode('mobile');
        } else {
          scale = window.innerWidth / 100;
          SetWindowMode('window');
        }
        dispatch({ type: 'UpdateFactor', value: Math.ceil(scale) });
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return (): void => window.removeEventListener('resize', updateSize);
    }, []);

    useImperativeHandle(ref, () => ({
      handleColorChange(type: string) {
        dispatch({ type: 'changeColor', value: type });
      },
      saveImage() {
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
            const frame = FramesProps.find((item: FrameType) => item.id === selectedFrame);
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
            price: selectedFrame === '0' ? item.price : item.framePrice,
            frameFactor,
          };
          saveItem({ variables: { input: { data: SavedObject, filename: name, wallArtId: currentWallArtID } } });
        }
      },
    }));

    const setCurrentSelectedFrame = (id: string) => {
      let url = '#';
      const item = FramesProps.find((item: FrameType) => {
        return item.id === id;
      });
      if (!item) return;
      url = cloudinaryCtx.url(item.FramedImageThumbnail, {
        width: Math.ceil(20 * 15),
        height: Math.ceil(24 * 15),
        crop: 'scale',
      });
      dispatch({
        type: 'frameChange',
        value: id,
        url,
        frameBorderWidth: id === '0' ? 0 : item.FrameBorderWidth,
        frameBorderImageWidth: id === '0' ? 0 : item.FrameImageBorderWidth,
        frameBorderOutset: id === '0' ? 0 : item.FrameImageOutset,
      });
    };

    const getWallArtImageData = (filename: string) => {
      if (isUploaded) return;
      if (filename == 'temp') return;
      try {
        const currentColor = isColor;
        client
          .query({
            query: GET_MY_WALL_ART_IMAGE,
            variables: { input: { filename: filename, wallArtId: currentWallArtID } },
          })
          .then(res => {
            if (res.data) {
              const data = res.data.getMyWallArtImage;
              let printSizeIndex = -1;
              for (let i = 0; i < data.printSizes.length; i++) {
                if (data.printSizes[i].width == width && data.printSizes[i].height == height) printSizeIndex = i;
              }
              if (printSizeIndex == -1) {
                setErrorIsOpen(true);
                dispatch({ type: 'FileName', value: '' });
                return;
              }
              dispatch({
                type: 'InitState',
                size: data.printSizes[printSizeIndex].id,
                height: data.printSizes[printSizeIndex].height,
                width: data.printSizes[printSizeIndex].width,
                printSizes: data.printSizes,
                base64: data.base64,
                base64GrayScale: data.base64GrayScale,
                name: data.name,
              });
              dispatch({ type: 'changeColor', value: currentColor });
              dispatch({ type: 'InitFrames', Frames: FramesProps });
              setIsUploaded(true);
              setUploadedFlag(true, currentImageNo);
            }
          })
          .catch(err => {
            setErrorIsOpen(true);
            dispatch({ type: 'FileName', value: '' });
          });
      } catch (e) {}
    };

    const handleScaleChange = (value: number): void => {
      dispatch({ type: 'Scale', value });
    };

    const handleChange = async (item: Array<File>): Promise<void> => {
      if (item.length == 0) return;
      uploadFile({
        variables: { input: { wallArtId: currentWallArtID, file: item[item.length - 1], imageNo: currentImageNo } },
      });
    };

    useEffect(() => {
      if (imageFilename != '') {
        dispatch({ type: 'FileName', value: imageFilename });
        getWallArtImageData(imageFilename);
      }
    }, [imageFilename]);

    useEffect(() => {
      if (FramesProps && FramesProps.length != 0) setCurrentSelectedFrame(currentSelectedFrame);
    }, [currentSelectedFrame]);

    if (updatingImage.loading) return <Loader />;

    return (
      <Grid container className={classes.checkoutButtonWrapper}>
        <ErrorDialog isOpen={isErrorOpen} str={'UploadingImageError'} onClose={(): void => setErrorIsOpen(false)} />
        {uploadingFile.loading && <CircularProgress className={classes.fabProgress} />}
        {!imageBase64 && !uploadingFile.loading && (
          <DropzoneArea
            dropzoneText={'Upload File Here'}
            dropzoneClass={classes.dropZone}
            onChange={(item: Array<File>) => handleChange(item)}
            maxFileSize={50 * 1000000}
            acceptedFiles={['image/*']}
            showAlerts={false}
            showPreviewsInDropzone={false}
            filesLimit={10}
            initialFiles={[]}
          ></DropzoneArea>
        )}
        {imageBase64 && (
          <div
            className={classes.frame}
            style={{
              height:
                height != 24
                  ? WindowMode == 'window'
                    ? frameFactor * height + 30
                    : frameFactor * 20 + 108
                  : frameFactor * 20 + 108,
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
                style={{
                  height:
                    WindowMode == 'window'
                      ? height * frameFactor * 0.7 + frameBorderWidth * 2
                      : 24 * frameFactor * 0.7 + frameBorderWidth * 2,
                }}
                className={css`
                  top: 0;
                  left: 0;
                  border: ${frameBorderWidth}px solid;
                  border-image: url(${FrameUrl}) ${frameBorderImageWidth} ${frameBorderOutset} stretch;
                `}
              >
                <AvatarEditor
                  image={imageBase64}
                  width={WindowMode == 'window' ? width * frameFactor * 0.7 : 20 * frameFactor * 0.7}
                  height={WindowMode == 'window' ? height * frameFactor * 0.7 : 24 * frameFactor * 0.7}
                  border={printMargin}
                  color={[255, 255, 255, 0.8]}
                  scale={scale}
                  rotate={rotate}
                  ref={editorRef}
                />
              </div>
            </div>
          </div>
        )}
        {imageBase64 && (
          <Grid container>
            <Grid item xs={12} className={classes.DragIconSection}>
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
              <DragIcon className={classes.orangeColor} />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  },
);
export default imageUploader;
