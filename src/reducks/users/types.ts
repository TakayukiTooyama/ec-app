import { Image } from '../products/types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type Users = {
  users: User;
};

export type User = {
  uid: string;
  username: string;
  role: string;
  isSignedIn: boolean;
  cart: Cart[];
};

export type Cart = {
  added_at: firebase.firestore.Timestamp;
  cartId?: string;
  name: string;
  description: string;
  gender: string;
  price: number;
  images: Image[];
  productId: string;
  quantity: number;
  size: string;
};

//====================
// Redux Action Type
//====================
export const FETCH_PRODUCT_IN_CART = 'FETCH_PRODUCT_IN_CART';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

interface FetchProductInCartAction {
  type: typeof FETCH_PRODUCT_IN_CART;
  payload: Cart[];
}
interface SignInAction {
  type: typeof SIGN_IN;
  payload: User;
}
interface SignUpAction {
  type: typeof SIGN_UP;
  payload: User;
}
interface SignOutAction {
  type: typeof SIGN_OUT;
  payload: User;
}

export type UserActionType = FetchProductInCartAction | SignInAction | SignUpAction | SignOutAction;

//=================
// operations type
//=================
type MyRootState = Users;
type MyExtraArg = undefined;
export type MyTunkResult<T> = ThunkAction<T, MyRootState, MyExtraArg, Action>;
export type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;
