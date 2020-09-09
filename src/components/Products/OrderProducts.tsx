import React, { useCallback } from 'react';
import { makeStyles, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { FlexibleOrderProduct } from '../../reducks/users/types';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Button } from '../UIkit';

const useStyles = makeStyles((theme) => ({
  list: {
    background: '#fff',
    height: 'auto',
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96,
  },
  text: {
    width: '100%',
  },
}));

type Props = {
  products: FlexibleOrderProduct;
};

const OrderProducts = ({ products }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goToProductDetail = useCallback((id) => {
    dispatch(push(`/product/${id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <List>
      {Object.keys(products).map((key) => {
        const product = products[key];
        return (
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img className={classes.image} src={product.images[0].path} alt="商品画像" />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText primary={product.name} secondary={`サイズ:${product.size}`} />
              <ListItemText primary={product.price} />
            </div>
            <Button label="商品詳細を見る" onClick={() => goToProductDetail(product.id)} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default OrderProducts;
