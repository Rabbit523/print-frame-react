import React from 'react';
import { tableHead, tableData } from './dummy';
import { makeStyles } from '@material-ui/core/styles';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';

import TableComponent from './table';
const useStyles = makeStyles(theme => ({
  container,
  section: {
    ...section,
    padding: '70px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
}));

const SalesTable = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <TableComponent tablehead={tableHead} tabledata={tableData} />
      </div>
    </div>
  );
};

export default SalesTable;
