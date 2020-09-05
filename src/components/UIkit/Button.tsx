import React, { ReactNode } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

type Props = {
  label: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
  startIcon?: ReactNode;
  onClick?: any;
};

function DefaultButton({ label, variant, color, size, startIcon, onClick }: Props) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 240px;
`;

export default DefaultButton;
