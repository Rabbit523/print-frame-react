import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { container, section } from '../../assets/jss/material-kit-pro-react.js';

const useStyles = makeStyles(theme => ({
  container,
  section: {
    ...section,
    backgroundImage: `url(https://res.cloudinary.com/dpvymgk1m/image/upload/f_auto,q_auto/printAndFrameIt/process_2x_cczfhd.jpg)`,
    padding: '70px 0px',
    '& h4$description': {
      fontSize: '1.5em',
    },
  },
  itemsWrapper: {
    background: '#FFF3F3',
    paddingLeft: '10px',
    paddingRight: '10px',
    '& p': {
      fontSize: '1.2em',
    },
  },
  item: {
    textAlign: 'center',
  },
  svg: {
    fontSize: '70px',
    border: '1px solid #082A4C',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: 'inset 0px 0px 3px 1px #333',
    marginTop: '-47px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
}));

export default function ProcessSectionsBg({ children }: { children: JSX.Element | [JSX.Element] }): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}
