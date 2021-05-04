import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Features from '../Features';

type TableBodyProps = {
  size: string;
  printFrame: number;
  print: number;
  frame: number;
};

type TableHeadProps = {
  name: string;
};

type TableProps = {
  tablehead: TableHeadProps[];
  tabledata: TableBodyProps[];
};

const useStyles = makeStyles(theme => {
  return {
    tableContainer: {
      width: '80%',
      margin: 'auto',
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
    },
    heading: {
      textAlign: 'center',
      fontFamily: 'Century Gothic Pro',
      color: '#60731e',
      margin: '20px',
    },
    buttonContainer: {
      textAlign: 'center',
      margin: '20px',
    },
    button: {
      background: '#19295a',
      color: 'orange',
      '&:hover': {
        background: '#19295a',
      },
    },
    printFrame: {
      color: '#60731e',
    },
    tableHead: {
      color: 'orange',
    },
    tableRow: {
      border: 'none',
    },
  };
});

export const renderTableBody = (value: TableBodyProps, index: number) => {
  const classes = useStyles();
  return (
    <TableRow key={index} className={classes.tableRow}>
      <TableCell size="small" align="center">
        {value.size}
      </TableCell>
      <TableCell size="small" align="center" className={classes.printFrame}>
        {value.printFrame}
      </TableCell>
      <TableCell size="small" align="center">
        {value.print}
      </TableCell>
      <TableCell size="small" align="center">
        {value.frame}
      </TableCell>
    </TableRow>
  );
};

export const renderHead = (value: TableHeadProps, index: number): JSX.Element => {
  const classes = useStyles();
  return (
    <TableCell key={index} align="center" className={classes.tableHead}>
      {value.name}
    </TableCell>
  );
};

const TableComponent = ({ tablehead, tabledata }: TableProps): JSX.Element => {
  const { t } = useTranslation('SalesTabel');
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <h2 className={classes.heading}>{t('Title')}</h2>
          <Paper className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>{tablehead.map(renderHead)}</TableRow>
              </TableHead>
              <TableBody>{tabledata.map(renderTableBody)}</TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Features />
        </Grid>
      </Grid>
    </>
  );
};

export default TableComponent;
