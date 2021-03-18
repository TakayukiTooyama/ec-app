import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderMenu } from './index';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import ClosedDrawer from './ClosedDrawer';
import { RootState } from '../../reducks/store/store';

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
  title: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  iconButton: {
    margin: '0 0 0 auto',
  },
});

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
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
          <div onClick={() => dispatch(push('/'))} className={classes.title}>
            ECサイト
          </div>
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
