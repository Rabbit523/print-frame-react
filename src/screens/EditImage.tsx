import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Main from '../layouts/Main';
import { ImageSteps, ImageBreadcrumb } from '../components/Bredcrumb';
import Canvas from '../components/ImageEditor';
import TextureBg from '../components/General/TextureBg';
import ImageAlbum from '../components/ImageAlbum';
interface EditorProps extends RouteComponentProps {
  imageId?: string;
}

const EditImage = ({ imageId }: EditorProps): JSX.Element => {
  return (
    <Main title="Edit Image" description="you upload and we print it" pageId="EditImage">
      <TextureBg>
        <ImageBreadcrumb activeStep={ImageSteps.SelectSize} />
        {imageId ? <Canvas imageId={imageId} /> : <ImageAlbum />}
      </TextureBg>
    </Main>
  );
};

export default EditImage;
