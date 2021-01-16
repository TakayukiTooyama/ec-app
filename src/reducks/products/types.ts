import { RouterState } from 'connected-react-router';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { firestore } from 'firebase';
import { Favorite, Users } from '../users/types';

export type ConnectRouter = {
  router: RouterState;
};

export type Products = {
  products: {
    list: Product[];
  };
};

export type ProductList = {
  list: Product[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: number;
  fbChecked: boolean;
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
  sizeId: string;
  size: string;
  fbChecked: boolean;
  quantity: number;
};

export type Category = {
  id: string;
  name: string;
  order?: string;
};
//====================
// Redux Action Type
//====================
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

interface FetchProductAction {
  type: typeof FETCH_PRODUCT;
  payload: Product[];
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: Product[];
}

export type ProductActionType = FetchProductAction | DeleteProductAction;

//=================
// operations type
//=================
export type MyTunkProductsResult<T> = ThunkAction<T, Products, undefined, Action>;

export type MyTunkUsersResult<T> = ThunkAction<T, Users & Favorite, undefined, Action>;

export type MyThunkDispatch = ThunkDispatch<Products, undefined, Action>;
