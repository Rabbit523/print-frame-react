/* eslint-disable react/prop-types */

import React from 'react';
import { Grid } from '@material-ui/core';
import { getImageUrl } from '../../../utils/cloudinary';
import ImageUploader from '../imageUploader';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';

const CaptureFour = ({
  widthScale,
  successfullySaved,
  setUploadedFlag,
  currentWallArtID,
  selectedFrame,
  editorRef,
  wallArtID,
  WallArtData,
  Frames,
  WindowMode,
}: any): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div className={classes.frameImage}>
          <img src={`${getImageUrl('/capture-4_kempn3.png')}`} alt="frameImage" />
        </div>
      </Grid>
      <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <div className={classes.frameImage}>
              <h1>1</h1>
              <p>{t('frameTitle1')}</p>
            </div>
            <div style={{ height: WindowMode === 'window' ? widthScale * 14 + 70 : widthScale * 20 + 148 }}>
              <ImageUploader
                imageFilename={wallArtID == '' || !WallArtData ? '' : WallArtData.images[0].name}
                successfullySaved={successfullySaved}
                setUploadedFlag={setUploadedFlag}
                currentImageNo={0}
                currentWallArtID={currentWallArtID}
                FramesProps={Frames}
                currentSelectedFrame={selectedFrame}
                width={14}
                height={14}
                ref={editorRef[0]}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.frameImage}>
              <h1>2</h1>
              <p>{t('frameTitle2')}</p>
            </div>
            <div style={{ height: WindowMode === 'window' ? widthScale * 14 + 70 : widthScale * 20 + 148 }}>
              <ImageUploader
                imageFilename={wallArtID == '' || !WallArtData ? '' : WallArtData.images[1].name}
                successfullySaved={successfullySaved}
                setUploadedFlag={setUploadedFlag}
                currentImageNo={1}
                currentWallArtID={currentWallArtID}
                FramesProps={Frames}
                currentSelectedFrame={selectedFrame}
                width={14}
                height={14}
                ref={editorRef[1]}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.frameImage}>
              <h1>3</h1>
              <p>{t('frameTitle3')}</p>
            </div>
            <div style={{ height: WindowMode === 'window' ? widthScale * 14 + 70 : widthScale * 20 + 148 }}>
              <ImageUploader
                imageFilename={wallArtID == '' || !WallArtData ? '' : WallArtData.images[2].name}
                successfullySaved={successfullySaved}
                setUploadedFlag={setUploadedFlag}
                currentImageNo={2}
                currentWallArtID={currentWallArtID}
                FramesProps={Frames}
                currentSelectedFrame={selectedFrame}
                width={14}
                height={14}
                ref={editorRef[2]}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.frameImage}>
              <h1>4</h1>
              <p>{t('frameTitle4')}</p>
            </div>
            <div style={{ height: WindowMode === 'window' ? widthScale * 14 + 70 : widthScale * 20 + 148 }}>
              <ImageUploader
                imageFilename={wallArtID == '' || !WallArtData ? '' : WallArtData.images[3].name}
                successfullySaved={successfullySaved}
                setUploadedFlag={setUploadedFlag}
                currentImageNo={3}
                currentWallArtID={currentWallArtID}
                FramesProps={Frames}
                currentSelectedFrame={selectedFrame}
                width={14}
                height={14}
                ref={editorRef[3]}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CaptureFour;
