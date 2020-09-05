import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';

import { getIsSignedIn } from '../../reducks/users/selectors';
import { Users } from '../../reducks/users/types';

function Header() {
  const selector = useSelector((state: Users) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isSignedIn ? (
          <>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
