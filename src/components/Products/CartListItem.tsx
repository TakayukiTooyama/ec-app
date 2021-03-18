import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { Cart } from '../../reducks/users/types';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { getUid } from '../../reducks/users/selectors';
import { RootState } from '../../reducks/store/store';

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
});

type Props = {
  product: Cart;
};

const CartListItem = ({ product }: Props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUid(selector);

  const removeProductInCart = (cartId: string | undefined) => {
    const cartRef = db.collection('users').doc(uid).collection('cart');
    cartRef.doc(cartId).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={product.images[0].path} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={product.name} secondary={`サイズ: ${product.size}`} />
          <ListItemText primary={`￥${product.price}`} />
        </div>
        <IconButton onClick={() => removeProductInCart(product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
