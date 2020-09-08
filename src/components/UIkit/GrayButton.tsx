import React, { ReactNode } from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey[300],
    color: '000',
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256,
  },
}));

type Props = {
  label: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  startIcon?: ReactNode;
  onClick: any;
};

function GrapButton({ label, variant, startIcon, onClick }: Props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant={variant}
      startIcon={startIcon}
      onClick={() => onClick()}
    >
      {label}
    </Button>
  );
}

export default GrapButton;
