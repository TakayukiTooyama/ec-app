import { Image } from '../products/types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { firestore } from 'firebase';
import { Favorite } from '@material-ui/icons';

export type Users = {
  users: User;
};

export type User = {
  uid: string;
  username: string;
  role: string;
  isSignedIn: boolean;
  cart: Cart[];
  orders: Order[];
  favorites: Favorite[];
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
  sizeId: string;
};

export type Favorite = Cart & {
  favoriteId?: string;
  fbChecked: boolean;
};

export type FlexibleOrderProduct = {
  [prop: string]: OrderProduct;
};

type OrderProduct = {
  id: string;
  images: Image[];
  name: string;
  price: number;
  size: string;
};

export type Order = {
  id: string;
  amount: number;
  created_at: firestore.Timestamp;
  products: FlexibleOrderProduct;
  shipping_at: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};

//====================
// Redux Action Type
//====================
export const ADD_PRODUCT_TO_FAVORITE = 'ADD_PRODUCT_TO_FAVORITE';
export const REMOVE_PRODUCT_FAVORITE = 'REMOVE_PRODUCT_FAVORITE';
export const FETCH_PRODUCT_IN_CART = 'FETCH_PRODUCT_IN_CART';
export const FETCH_PRODUCT_IN_FAVORITE = 'FETCH_PRODUCT_IN_FAVORITE';
export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

interface AddProudctToFavoriteAction {
  type: typeof ADD_PRODUCT_TO_FAVORITE;
  payload: Favorite[];
}
interface RemoveProudctFavoriteAction {
  type: typeof REMOVE_PRODUCT_FAVORITE;
  payload: Favorite[];
}
interface FetchProductInCartAction {
  type: typeof FETCH_PRODUCT_IN_CART;
  payload: Cart[];
}
interface FetchProductInFavoriteAction {
  type: typeof FETCH_PRODUCT_IN_FAVORITE;
  payload: Favorite[];
}
interface FetchOrdersHistoryAction {
  type: typeof FETCH_ORDERS_HISTORY;
  payload: FlexibleOrderProduct[];
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

export type UserActionType =
  | AddProudctToFavoriteAction
  | RemoveProudctFavoriteAction
  | FetchProductInCartAction
  | FetchProductInCartAction
  | FetchProductInFavoriteAction
  | FetchOrdersHistoryAction
  | SignInAction
  | SignUpAction
  | SignOutAction;

//=================
// operations type
//=================
type MyRootState = Users;
type MyExtraArg = undefined;
export type MyTunkResult<T> = ThunkAction<T, MyRootState, MyExtraArg, Action>;
export type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;
