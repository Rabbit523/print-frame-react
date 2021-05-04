import React, { useEffect } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loader from '../General/loader';
import { useSingInAnonymously } from '../../containers/firebase/auth';

import { UPLOAD_FILE } from '../../queries/FileUpload';

const useStyles = makeStyles(theme =>
  createStyles({
    uploadFrame: {
      maxWidth: '450px',
      display: 'none',
    },
    dropZone: {
      backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/b_rgb:ffffff,c_scale,h_250,r_3,w_450/v1577610158/printAndFrameIt/Frames/Brown_1.png)`,
      display: 'flex',
      width: '450px',
      margin: 'auto',
      border: 'none',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      '& > div': {
        maxWidth: '350px',
        '& > p': {
          marginBottom: '0',
          color: 'black',
        },
      },
      [theme.breakpoints.down('sm')]: {
        backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/b_rgb:ffffff,c_scale,h_250,r_3,w_300/v1577610158/printAndFrameIt/Frames/Brown_1.png)`,
        maxWidth: '300px',
        height: '250px',
        marginBottom: '25px',
        '& > div': {
          maxWidth: '250px',
          '& > p': {
            fontSize: '18px',
          },
        },
      },
    },
  }),
);

export interface ImageInfo {
  name: string;
  base64: string;
  base64GrayScale: string;
  printSizes: {
    id: string;
    width: number;
    height: number;
    price: number;
  };
  __typename: string;
}

const Uploader = (): JSX.Element => {
  const classes = useStyles();
  const [uploadFile, { data, error, loading }] = useMutation(UPLOAD_FILE);
  const anonymousSingIn = useSingInAnonymously();
  const handleChange = (item: Array<File>): void => {
    anonymousSingIn();
    uploadFile({ variables: { input: item[0] } });
  };
  useEffect(() => {
    if (data) {
      navigate(`/image-editor/${data.singleImageFileUpload.name}`);
    }
  }, [data]);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log(JSON.stringify(error, null, 4));
  }

  return (
    <div>
      <DropzoneArea
        dropzoneText={'Upload File Here'}
        dropzoneClass={classes.dropZone}
        onChange={(item: Array<File>): void => handleChange(item)}
        maxFileSize={50 * 1000000}
        acceptedFiles={['image/*']}
      />
    </div>
  );
};
export default Uploader;
