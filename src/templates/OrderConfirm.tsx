import React, { useMemo, useCallback } from 'react';
import { makeStyles, List, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/Products';
import { Button, TextDetail } from '../components/UIkit';
import { orderProduct } from '../reducks/products/operations';
import { RootState } from '../reducks/store/store';

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const productInCart = getCart(selector);

  const subtotal = useMemo(
    () => productInCart.reduce((sum, product) => (sum += product.price), 0),
    [productInCart]
  );
  const postage = subtotal < 10000 ? 210 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + postage + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productInCart, total));
  }, [dispatch, productInCart, total]);

  return (
    <div className="c-section-wrapin">
      <div className="u-text__headline">注文の確認</div>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productInCart.length > 0 &&
              productInCart.map((product) => (
                <CartListItem product={product} key={product.cartId} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label="商品合計" value={`￥${subtotal.toLocaleString()}`} />
          <TextDetail label="送料" value={`￥${postage.toLocaleString()}`} />
          <TextDetail label="消費税" value={`￥${tax}`} />
          <Divider />
          <div className="module-spacer--extra-extra-small"></div>
          <TextDetail label="合計(税込)" value={`￥${total.toLocaleString()}`} />
          <Button label="注文を確定する" onClick={order} />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
