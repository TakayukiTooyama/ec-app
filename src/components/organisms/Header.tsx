import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
