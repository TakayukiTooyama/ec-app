import { User, Cart, FlexibleOrderProduct, Favorite } from './types';

export const removeProductFavoriteAction = (favorites: Favorite[]) => {
  return {
    type: 'REMOVE_PRODUCT_FAVORITE',
    payload: favorites,
  };
};
export const addProductToFavoriteAction = (favorites: Favorite) => {
  return {
    type: 'ADD_PRODUCT_TO_FAVORITE',
    payload: favorites,
  };
};

export const fetchProductInCartAction = (carts: Cart[]) => {
  return {
    type: 'FETCH_PRODUCT_IN_CART',
    payload: carts,
  };
};

export const fetchProductInFavoriteAction = (favorites: Favorite[]) => {
  return {
    type: 'FETCH_PRODUCT_IN_FAVORITE',
    payload: favorites,
  };
};

export const fetchOrdersHistoryAction = (orders: FlexibleOrderProduct[]) => {
  return {
    type: 'FETCH_ORDERS_HISTORY',
    payload: orders,
  };
};

export const signInAction = (userState: User) => {
  return {
    type: 'SIGN_IN',
    payload: {
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
      isSignedIn: true,
    },
  };
};

export const signUpAction = (userState: User) => {
  return {
    type: 'SIGN_UP',
    payload: {
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
      isSignedIn: true,
    },
  };
};

export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      uid: '',
      username: '',
      role: '',
      isSignedIn: false,
    },
  };
};
