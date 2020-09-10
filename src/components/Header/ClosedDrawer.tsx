import React, { useState, useCallback, useEffect } from 'react';
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
import { db } from '../../firebase';
import { Category } from '../../reducks/products/types';

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
type Filter = {
  func: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
  label: string;
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

  const [filters, setFilters] = useState<Filter[]>([
    { func: selectMenu, label: '全て', id: 'all', value: '/' },
    { func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male' },
    { func: selectMenu, label: 'レディース', id: 'female', value: '/?gender=female' },
  ]);

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

  useEffect(() => {
    const categoriesRef = db.collection('categories');
    categoriesRef
      .orderBy('order', 'asc')
      .get()
      .then((snapshots) => {
        const list: Filter[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as Category;
          list.push({
            func: selectMenu,
            label: data.name,
            id: data.id,
            value: `/?category=${data.id}`,
          });
        });
        setFilters((prev) => [...prev, ...list]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default ClosedDrawer;
