import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
});

type Props = {
  options: {
    id: string;
    name: string;
  }[];
  label: string;
  required: boolean;
  value: string;
  select: any;
};

function SelectBox({ options, label, required, value, select }: Props) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select required={required} value={value} onChange={(e) => select(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectBox;
