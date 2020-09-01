import React from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  label: string;
  fullWidth: boolean;
  multiline: boolean;
  required: boolean;
  type: string;
  value: string;
  margin?: 'dense' | 'none' | 'normal';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({
  label,
  fullWidth,
  multiline,
  required,
  type,
  value,
  margin,
  onChange,
}: Props) {
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      multiline={multiline}
      required={required}
      type={type}
      value={value}
      margin={margin}
      onChange={onChange}
    />
  );
}

export default TextInput;
