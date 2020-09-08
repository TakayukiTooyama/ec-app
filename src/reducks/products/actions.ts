import { ProductData } from './types';

export const fetchProductAction = (product: ProductData[]) => {
  return {
    type: 'FETCH_PRODUCT',
    payload: product,
  };
};

export const deleteProductAction = (product: ProductData[]) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: product,
  };
};
