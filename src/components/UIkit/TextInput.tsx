import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  label: string;
  fullWidth: boolean;
  multiline: boolean;
  required: boolean;
  rows?: number;
  type?: string;
  value: string | number;
  select?: boolean;
  margin?: 'dense' | 'none' | 'normal';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({
  label,
  fullWidth,
  multiline,
  required,
  rows,
  type,
  value,
  select,
  margin,
  onChange,
}: Props) {
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      multiline={multiline}
      required={required}
      rows={rows}
      type={type}
      value={value}
      select={select}
      margin={margin}
      onChange={onChange}
    />
  );
}

export default TextInput;
