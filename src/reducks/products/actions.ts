import { Data } from './types';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const addProductAction = () => {
  return {
    type: 'ADD_PRODUCT',
    payload: {},
  };
};

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const fetchProductAction = (product: Data[]) => {
  return {
    type: 'FETCH_PRODUCT',
    payload: product,
  };
};

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const deleteProductAction = (product: Data[]) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: product,
  };
};
