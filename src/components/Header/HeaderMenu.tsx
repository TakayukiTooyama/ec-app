import React from 'react';
import { IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  handleDrawerToggle: (e: any) => false | undefined;
};

function HeaderMenu({ handleDrawerToggle }: Props) {
  return (
    <>
      <IconButton>
        <ShoppingCartIcon />
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default HeaderMenu;
