import { Product } from './types';

export const fetchProductAction = (product: Product[]) => {
  return {
    type: 'FETCH_PRODUCT',
    payload: product,
  };
};

export const deleteProductAction = (product: Product[]) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: product,
  };
};
