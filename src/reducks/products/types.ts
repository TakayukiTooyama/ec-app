import { RouterState } from 'connected-react-router';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { firestore } from 'firebase';
import { Users } from '../users/types';

export type ConnectRouter = {
  router: RouterState;
};

export type Products = {
  products: {
    list: ProductData[];
  };
};

export type ProductList = {
  list: ProductData[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  images: Image[];
  sizes: Size[];
};

export type ProductData = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  images: Image[];
  sizes: Size[];
  created_at?: firestore.Timestamp;
  updated_at: firestore.Timestamp;
};

export type Image = {
  id: string;
  path: string;
};

export type Size = {
  size: string;
  quantity: number;
};

//====================
// Redux Action Type
//====================
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

interface FetchProductAction {
  type: typeof FETCH_PRODUCT;
  payload: ProductData[];
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: ProductData[];
}

export type ProductActionType = FetchProductAction | DeleteProductAction;

//=================
// operations type
//=================
type MyExtraArg = undefined;
export type MyTunkProductsResult<T> = ThunkAction<T, Products, MyExtraArg, Action>;
export type MyTunkUsersResult<T> = ThunkAction<T, Users, MyExtraArg, Action>;
export type MyThunkDispatch = ThunkDispatch<Products, MyExtraArg, Action>;
