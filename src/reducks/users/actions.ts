import { User, Cart } from './types';

export const fetchProductInCartAction = (carts: Cart[]) => {
  return {
    type: 'FETCH_PRODUCT_IN_CART',
    payload: carts,
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
