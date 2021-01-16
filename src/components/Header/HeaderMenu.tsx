import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { push } from 'connected-react-router';

import { db } from '../../firebase';
import { fetchProductInCart, fetchProductInFavorite } from '../../reducks/users/operations';
import { getCart, getUid, getFavoriteProducts } from '../../reducks/users/selectors';
import { Cart, Favorite } from '../../reducks/users/types';
import { RootState } from '../../reducks/store/store';

type Props = {
  handleDrawerToggle: (e: any) => false | undefined;
};

function HeaderMenu({ handleDrawerToggle }: Props) {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUid(selector);
  let productInCart = getCart(selector);
  let favorites = getFavoriteProducts(selector);

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
                (product: Cart) => product.cartId === change.doc.id
              );
              productInCart[index] = product;
              break;
            case 'removed':
              // eslint-disable-next-line react-hooks/exhaustive-deps
              productInCart = productInCart.filter(
                (product: Cart) => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductInCart(productInCart));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const favoritesRef = db.collection('users').doc(uid).collection('favorites');
    const unsubscribe = favoritesRef.onSnapshot((snapshots) => {
      snapshots.docChanges().forEach((change) => {
        const product = change.doc.data() as Favorite;
        const changeType = change.type;

        switch (changeType) {
          case 'added':
            favorites.push(product);
            break;
          case 'modified':
            const index = favorites.findIndex(
              (product: Favorite) => product.sizeId === change.doc.id
            );
            favorites[index] = product;
            break;
          case 'removed':
            // eslint-disable-next-line react-hooks/exhaustive-deps
            favorites = favorites.filter((product: Favorite) => product.sizeId !== change.doc.id);
            break;
          default:
            break;
        }
      });
      dispatch(fetchProductInFavorite(favorites));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge badgeContent={productInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push('/user/favorite'))}>
        <Badge badgeContent={favorites.length} color="secondary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default HeaderMenu;
