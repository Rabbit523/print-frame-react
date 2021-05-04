import React from 'react';
import Main from '../layouts/Main';
import Uploader from '../components/Uploader';
import TextureBg from '../components/General/TextureBg';
import { ImageBreadcrumb, ImageSteps } from '../components/Bredcrumb';

const UploadFile = (): JSX.Element => {
  return (
    <Main title="Upload File" description="you upload and we print it" pageId="ImageUpload">
      <TextureBg>
        <ImageBreadcrumb activeStep={ImageSteps.UploadImage} />
        <Uploader />
      </TextureBg>
    </Main>
  );
};

export default UploadFile;
