import React, { useEffect } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Cart } from '../../reducks/users/types';
import { getCart, getUid } from '../../reducks/users/selectors';
import { db } from '../../firebase';
import { fetchProductInCart } from '../../reducks/users/operations';

type Props = {
  handleDrawerToggle: (e: any) => false | undefined;
};

function HeaderMenu({ handleDrawerToggle }: Props) {
  const dispatch = useDispatch();
  const selector = useSelector((state: Users) => state);
  const uid = getUid(selector);
  let productInCart = getCart(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('cart')
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data() as Cart;
          const changeType = change.type;

          switch (changeType) {
            case 'added':
              productInCart.push(product);
              break;
            case 'modified':
              const index = productInCart.findIndex(
                (product: Cart) => product.productId === change.doc.id
              );
              productInCart[index] = product;
              break;
            case 'removed':
              // eslint-disable-next-line react-hooks/exhaustive-deps
              productInCart = productInCart.filter(
                (product: Cart) => product.cartId !== change.doc.id
              );
              break;
          }
        });
        dispatch(fetchProductInCart(productInCart));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IconButton>
        <Badge badgeContent={productInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default HeaderMenu;
