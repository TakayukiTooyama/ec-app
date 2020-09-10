import React, { ReactNode } from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#4dd0e1',
    color: '000',
    fontSize: 16,
    height: 48,
    width: 256,
  },
});

type Props = {
  label: string;
  startIcon?: ReactNode;
  onClick: any;
};

function DefaultButton({ label, startIcon, onClick }: Props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      startIcon={startIcon}
      onClick={() => onClick()}
    >
      {label}
    </Button>
  );
}

export default DefaultButton;
