import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

type Props = {
  label: string;
  fullWidth: boolean;
  multiline: boolean;
  required: boolean;
  rows?: number;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  full: {
    marginBottom: 16,
  },
  half: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    minWidth: 130,
    width: 'calc(50% - 16px)',
  },
});

function TextInput({ label, fullWidth, multiline, required, rows, type, value, onChange }: Props) {
  const classes = useStyles();
  const textStyle = fullWidth ? classes.full : classes.half;

  return (
    <TextField
      className={textStyle}
      margin="dense"
      label={label}
      fullWidth={fullWidth}
      multiline={multiline}
      required={required}
      rows={rows}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
