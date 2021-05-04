import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Main from '../layouts/Main';
import { ImageSteps, ImageBreadcrumb } from '../components/Bredcrumb';
import WallArtCanvas from '../components/WallArtEditor';
import TextureBg from '../components/General/TextureBg';
import ImageAlbum from '../components/ImageAlbum';
interface EditorProps extends RouteComponentProps {
  wallArtType?: string;
  wallArtID?: string;
}

const EditWallArt = ({ wallArtType, wallArtID }: EditorProps): JSX.Element => {
  return (
    <Main title="Edit Image" description="you upload and we print it" pageId="EditWallArt">
      <TextureBg>
        <ImageBreadcrumb activeStep={ImageSteps.SelectSize} />
        {wallArtType ? <WallArtCanvas wallArtType={wallArtType} wallArtID={wallArtID ? wallArtID : ''} /> : null}
      </TextureBg>
    </Main>
  );
};

export default EditWallArt;
