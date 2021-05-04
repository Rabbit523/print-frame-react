import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddressInput } from '../ShippingInfo';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    '& th': {
      borderBottom: 'none',
    },
  },
  boxContainer: {
    border: '1px solid #d9d9d9',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  shipingEdit: {
    float: 'right',
    paddingTop: 10,
    fontSize: 15,
  },
  addressTitle: {
    fontSize: 30,
  },
  '@media (max-width: 424px)': {
    maxWidth: '425px',
    shipingEdit: {
      marginTop: -30,
    },
    addressTitle: {
      fontSize: 20,
    },
  },
});

const AddressInfo = ({ info, type }: { info: any; type: string }): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation('CartItems');
  return (
    <TableContainer className={classes.boxContainer}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <h1 className={classes.addressTitle}>
                {type}
                <a className={classes.shipingEdit} href="#">
                  {t('Edit')}{' '}
                </a>
              </h1>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {info.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {info.street1}
            </TableCell>
          </TableRow>
          {info.street2 && (
            <TableRow>
              <TableCell component="th" scope="row">
                {info.street2}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell component="th" scope="row">
              {info.zipCode + ', ' + info.city}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {info.state + ', USA'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {info.email}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AddressInfo;
