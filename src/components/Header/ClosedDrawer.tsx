import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import { TextInput } from '../UIkit';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}));

type Props = {
  open: boolean;
  onClose: (e: any) => false | undefined;
};
type Menu = {
  func: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
  label: string;
  icon: JSX.Element;
  id: string;
  value: string;
};

function ClosedDrawer({ open, onClose }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const handleKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => {
    dispatch(push(path));
    onClose(e);
  };

  const menus: Menu[] = [
    {
      func: selectMenu,
      label: '商品登録',
      icon: <AddCircleIcon />,
      id: 'register',
      value: '/product/edit',
    },
    {
      func: selectMenu,
      label: '注文履歴',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/order/history',
    },
    {
      func: selectMenu,
      label: 'プロフィール',
      icon: <PersonIcon />,
      id: 'profile',
      value: '/user/mypage',
    },
  ];

  return (
    <div className={classes.drawer}>
      <Drawer
        anchor="right"
        open={open}
        onClose={(e) => onClose(e)}
        onKeyDown={(e) => onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onKeyDown={(e) => onClose(e)}>
          <div className={classes.searchField}>
            <TextInput
              label="キーワードを入力"
              fullWidth={true}
              multiline={false}
              required={false}
              type="text"
              rows={1}
              value={keyword}
              onChange={handleKeyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu: Menu) => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default ClosedDrawer;
