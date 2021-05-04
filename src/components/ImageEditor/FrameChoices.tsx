import React from 'react';
import { Table, TableRow, TableCell, TableHead, TableBody, Paper, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_PRODUCTS } from '../../queries/products';
import Loader from '../General/loader';
import { Image } from 'cloudinary-react';
import { navigate } from '@reach/router';
import { FrameType } from '../../types/';

const useStyles = makeStyles(theme => {
  return {
    image: {
      height: '100px',
      width: '100px',
      padding: '0px',
    },
    frame: {
      position: 'relative',
    },
    frames: {
      width: '100%',
    },
    textHeading: {
      color: '#2b345b',
      marginTop: '10px',
      textAlign: 'center',
    },
    paragraph: {
      color: '#92a067',
      textAlign: 'center',
    },
    zoomContainer: {
      color: 'orange',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      padding: '15px',
    },
    button: {
      margin: '10px',
    },
    chooseFrame: {
      fontFamily: 'Arial',
      margin: '40px 0px',
      paddingBottom: 10,
      borderBottom: '#F9F9F9 solid 5px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    frameChoice: {
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  };
});

const FrameComponent = ({
  onFrameChange,
  selectedFrame,
}: {
  onFrameChange: Function;
  selectedFrame: string;
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('Frames');

  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <Loader />;
  if (error) navigate('/');
  const products = data.getAllProducts.products;

  const renderTableBody = (value: FrameType): JSX.Element => {
    return (
      <TableRow key={value.id}>
        <TableCell>
          <Radio checked={selectedFrame === value.id} value={value.id} onChange={(): void => onFrameChange(value.id)} />
        </TableCell>
        <TableCell>
          <Image publicId={value.Thumbnail} className={classes.image}></Image>
        </TableCell>
        <TableCell>
          <div>{value.productName}</div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <h2 className={classes.chooseFrame}>{t('ChooseFrame')}</h2>
      <Paper className={classes.frameChoice}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{t('Frame')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(renderTableBody)}
            <TableRow>
              <TableCell>
                <Radio checked={selectedFrame === '0'} onChange={(): void => onFrameChange('0')} />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div>{t('None')}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default FrameComponent;
