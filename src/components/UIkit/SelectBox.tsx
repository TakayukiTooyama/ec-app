import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

type Props = {
  margin?: 'none' | 'dense' | 'normal' | undefined;
  options: {
    id: string;
    name: string;
  }[];
  label: string;
  required: boolean;
  value: string;
  select: any;
};

function SelectBox({ margin, options, label, required, value, select }: Props) {
  return (
    <StyledFormControl margin={margin}>
      <InputLabel>{label}</InputLabel>
      <Select required={required} value={value} onChange={(e) => select(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
}

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export default SelectBox;
