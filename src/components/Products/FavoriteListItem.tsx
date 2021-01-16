import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Image } from '../../reducks/products/types';
import { useDispatch, useSelector } from 'react-redux';
import { Favorite } from '../../reducks/users/types';
import { getUid } from '../../reducks/users/selectors';
import { db } from '../../firebase';
import { addProductToCart } from '../../reducks/users/operations';
import { RootState } from '../../reducks/store/store';

type Props = {
  favorite: Favorite;
  sizeId: string;
  name: string;
  size: string;
  price: number;
  images: Image[];
};

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
  icon: {
    padding: 0,
    width: 48,
    height: 48,
  },
});

const FavoriteListItem = ({ sizeId, name, size, price, images, favorite }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUid(selector);

  const removeFavorite = (sizeId: string | undefined) => {
    if (sizeId !== undefined) {
      const favoritesRef = db.collection('users').doc(uid).collection('favorites');
      favoritesRef.doc(sizeId).delete();
    }
  };

  return (
    <ListItem className={classes.list}>
      <ListItemAvatar>
        <img className={classes.image} src={images[0].path} alt="お気に入り商品画像" />
      </ListItemAvatar>
      <div className={classes.text}>
        <ListItemText primary={name} secondary={size} />
        <ListItemText primary={`￥${price}`} />
      </div>
      <IconButton className={classes.icon} onClick={() => dispatch(addProductToCart(favorite))}>
        <ShoppingCartIcon />
      </IconButton>
      <IconButton className={classes.icon} onClick={() => removeFavorite(sizeId)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default FavoriteListItem;
