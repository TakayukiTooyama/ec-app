import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
    marginBottom: 16,
  },
  label: {
    marginLeft: 0,
    marginLight: 'auto',
  },
  value: {
    marginRight: 0,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
});

type Props = {
  label: string;
  value: string | number;
};

const TextDetail = ({ label, value }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default TextDetail;
