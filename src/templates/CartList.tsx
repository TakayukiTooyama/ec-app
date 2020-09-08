import React, { useCallback } from 'react';
import { List, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { Button, GrayButton } from '../components/UIkit';
import { getCart } from '../reducks/users/selectors';
import { Users, Cart } from '../reducks/users/types';
import { CartListItem } from '../components/Products';

const useStyles = makeStyles({
  list: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
});

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: Users) => state);
  const productInCart: Cart[] = getCart(selector);

  const goToCart = useCallback(() => {
    dispatch(push('/order/confirm'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.list}>
        {productInCart.length > 0 &&
          productInCart.map((product: Cart) => (
            <CartListItem product={product} key={product.cartId} />
          ))}
      </List>
      <div className="module-spacer--medium"></div>
      <div className="p-grid__column">
        <Button label="レジへ進む" onClick={goToCart} />
        <div className="module-spacer--extra-extra-small"></div>
        <GrayButton label="ショッピングを続ける" onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
