import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderMenu } from './index';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { Users } from '../../reducks/users/types';
import { push } from 'connected-react-router';
import ClosedDrawer from './ClosedDrawer';

const useStyles = makeStyles({
  root: {
    flexGlow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButton: {
    margin: '0 0 0 auto',
  },
});

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: Users) => state);
  const isSignedIn = getIsSignedIn(selector);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (e) => {
      if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
        return false;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.menuBar} position="fixed">
        <Toolbar className={classes.toolBar}>
          <div onClick={() => dispatch(push('/'))}>ECサイト</div>
          {isSignedIn && (
            <div className={classes.iconButton}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosedDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
}

export default Header;
