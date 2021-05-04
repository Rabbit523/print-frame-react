import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { useMutation } from '@apollo/react-hooks';
import { navigate } from '@reach/router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loader from './General/loader';
import { useSingInAnonymously } from '../containers/firebase/auth';
import * as Sentry from '@sentry/browser';
import { UPLOAD_FILE } from '../queries/FileUpload';

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

const Uploader = (): JSX.Element => {
  const classes = useStyles();
  const [uploadFile, { error, loading }] = useMutation(UPLOAD_FILE, {
    onCompleted: info => {
      navigate(`/image-editor/${info.singleImageFileUpload.name}`);
    },
  });
  const anonymousSingIn = useSingInAnonymously();
  const handleChange = (item: Array<File>): void => {
    anonymousSingIn();
    uploadFile({ variables: { input: item[0] } });
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    Sentry.captureException(error);
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
