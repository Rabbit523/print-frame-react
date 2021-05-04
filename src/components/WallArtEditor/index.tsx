import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Grid, Radio, RadioGroup, FormControlLabel } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import Loader from '../General/loader';
import useStyles from './styles';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import Navigation from './Navigations';
import { GET_ALL_PRODUCTS } from '../../queries/products';
import { ADD_WALL_ART, GET_WALL_ART } from '../../queries/orders';
import { navigate } from '@reach/router';
import MobileOptions from './MobileOptions';
import ErrorDialog from '../../components/General/ErrorDialog';
import { getImageUrl } from '../../utils/cloudinary';
import Family from './WallArtTypes/Family';
import Trio from './WallArtTypes/Trio';
import CaptureFour from './WallArtTypes/CaptureFour';

const WallArtCanvas = ({ wallArtType, wallArtID }: { wallArtType: string; wallArtID: string }): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  const classes = useStyles();
  const [isColor, setIsColor] = useState('full-color');
  const [path, setPath] = useState('');
  const [currentWallArtID, setCurrentWallArtId] = useState(wallArtID);
  const [updatedCount, setUpdatedCount] = useState(0);
  const [WindowMode, SetWindowMode] = useState('window');
  const [uploadedStatus, setUploadedStatus] = useState({
    status: [false, false, false, false, false],
  });
  const [WallArtData, setWallArtData] = useState();
  const [widthScale, setWidthScale] = useState(17);
  const [Frames, setFrames] = useState();
  const [selectedFrame, setSelectedFrame] = useState('');
  const [isErrorOpen, setErrorIsOpen] = useState(false);
  const editorRef: React.MutableRefObject<any>[] = [];
  const wallArtData = useQuery(GET_WALL_ART, { variables: { input: { id: currentWallArtID } } });
  const { data: FrameData, loading: FrameDataloading, error: FrameDataError } = useQuery(GET_ALL_PRODUCTS);
  const [addWall, { loading: AddWallLoading }] = useMutation(ADD_WALL_ART, {
    onCompleted: info => {
      setCurrentWallArtId(info.addWallArt.id);
    },
  });

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
      setWidthScale(Math.ceil(scale));
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsColor(event.target.value);
  };

  const getImagecount = (): number => {
    let count = 0;
    if (wallArtType == 'Family') count = 5;
    else if (wallArtType == 'Trio') count = 3;
    else if (wallArtType == 'Capture Four') count = 4;
    return count;
  };

  for (let i = 0, k = getImagecount(); i < k; i++) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editorRef.push(useRef<any>());
  }
  const setColor = (value: string): void => {
    setIsColor(value);
    const count = getImagecount();
    for (let i = 0; i < count; i++) {
      if (editorRef[i].current) editorRef[i].current.handleColorChange(value);
    }
  };

  const onFrameChange = (id: string): void => {
    setSelectedFrame(id);
  };
  const saveWallArt = (location: string): void => {
    const count = getImagecount();
    for (let i = 0; i < count; i++) {
      if (uploadedStatus.status[i] == false) {
        setErrorIsOpen(true);
        break;
      }
    }
    for (let i = 0; i < count; i++) {
      editorRef[i].current.saveImage();
    }
    setPath(location);
  };
  const addCurrentWallArt = async (): Promise<void> => {
    let price = 0;
    if (wallArtType == 'Family') price = 150;
    else if (wallArtType == 'Trio') price = 135;
    else if (wallArtType == 'Capture Four') price = 157;
    await addWall({ variables: { input: { name: wallArtType, price: price } } });
  };

  const setUploadedFlag = (status: boolean, index: number): void => {
    const tempStatus = uploadedStatus;
    tempStatus.status[index] = status;
    setUploadedStatus(tempStatus);
  };

  const successfullySaved = (): void => {
    const count = updatedCount + 1;
    setUpdatedCount(count);
  };

  useEffect(() => {
    setColor(isColor);
  }, [isColor]);

  useEffect(() => {
    if (currentWallArtID == '') addCurrentWallArt();
  }, [currentWallArtID]);

  useEffect(() => {
    if (!wallArtData.data || wallArtData.loading) return;
    if (wallArtData.error) navigate('/wall-art');
    if (currentWallArtID != '') {
      setWallArtData(wallArtData.data.getWallArt);
    }
  }, [wallArtData]);

  useEffect(() => {
    if (!FrameData || FrameDataError || !WallArtData) return;
    setFrames(FrameData.getAllProducts.products);
    if (WallArtData) {
      if (WallArtData.images[0].isBlackAndWhite) setColor('blackwhite');
      else setColor('full-color');
      for (let i = 0; i < FrameData.getAllProducts.products.length; i++) {
        if (FrameData.getAllProducts.products[i].productName == WallArtData.images[0].frameName)
          setSelectedFrame(FrameData.getAllProducts.products[i].id);
      }
    }
  }, [WallArtData, FrameData]);

  useEffect(() => {
    if (updatedCount == getImagecount()) {
      setPath('');
      setUpdatedCount(0);
      navigate(path);
    }
  }, [updatedCount]);

  if (AddWallLoading || wallArtData.loading || FrameDataloading) return <Loader />;

  return (
    <Grid container spacing={3} className={classes.innerContentArea}>
      <Grid item xs={12} sm={12} md={9}>
        <ErrorDialog isOpen={isErrorOpen} str={'UploadImageError'} onClose={(): void => setErrorIsOpen(false)} />
        {wallArtType === 'Family' && currentWallArtID && (
          <Family
            widthScale={widthScale}
            WindowMode={WindowMode}
            editorRef={editorRef}
            successfullySaved={successfullySaved}
            setUploadedFlag={setUploadedFlag}
            selectedFrame={selectedFrame}
            currentWallArtID={currentWallArtID}
            wallArtID={wallArtID}
            WallArtData={WallArtData}
            Frames={Frames}
          />
        )}
        {wallArtType === 'Trio' && currentWallArtID && (
          <Trio
            widthScale={widthScale}
            WindowMode={WindowMode}
            editorRef={editorRef}
            successfullySaved={successfullySaved}
            setUploadedFlag={setUploadedFlag}
            selectedFrame={selectedFrame}
            currentWallArtID={currentWallArtID}
            wallArtID={wallArtID}
            WallArtData={WallArtData}
            Frames={Frames}
          />
        )}
        {wallArtType === 'Capture Four' && currentWallArtID && (
          <CaptureFour
            widthScale={widthScale}
            WindowMode={WindowMode}
            editorRef={editorRef}
            successfullySaved={successfullySaved}
            setUploadedFlag={setUploadedFlag}
            selectedFrame={selectedFrame}
            currentWallArtID={currentWallArtID}
            wallArtID={wallArtID}
            WallArtData={WallArtData}
            Frames={Frames}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Grid>
          <RadioGroup
            aria-label="gender"
            value={isColor}
            onChange={handleColorChange}
            className={classes.radioContainer}
          >
            <div className={classes.radioWrapper}>
              <img
                src={`${getImageUrl('/printAndFrameIt/pexels-photo-237355_2x_um99ci.png')}`}
                className={classes.wallArtColoredImage}
              />
              <FormControlLabel
                value="full-color"
                control={<Radio />}
                label={<Typography className={classes.formControlLabel}>{t('FullColor')}</Typography>}
              />
            </div>
            <div className={classes.radioWrapper}>
              <img
                src={`${getImageUrl('/printAndFrameIt/pexels-photo-57905_2x_jnpjay.png')}`}
                className={classes.wallArtBlackWhiteImage}
              />
              <FormControlLabel
                value="blackwhite"
                control={<Radio />}
                label={<Typography className={classes.formControlLabel}>{t('BlackWhite')}</Typography>}
              />
            </div>
          </RadioGroup>
        </Grid>
        <Grid className={classes.priceContainer}>
          {Frames && (
            <MobileOptions
              classes={classes}
              products={Frames}
              selectedFrame={selectedFrame}
              onFrameChange={onFrameChange}
            />
          )}
        </Grid>
      </Grid>
      <Navigation classes={classes} saveWallArt={saveWallArt} />
    </Grid>
  );
};

export default WallArtCanvas;
