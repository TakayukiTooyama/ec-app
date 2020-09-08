import { initialState } from '../store/initialState';
import { ProductList, FETCH_PRODUCT, DELETE_PRODUCT, ProductActionType } from './types';

export const ProductsReducer = (
  state: ProductList = initialState.products,
  action: ProductActionType
) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        list: [...action.payload],
      };
    case DELETE_PRODUCT:
      return {
        list: [...action.payload],
      };
    default:
      return state;
  }
};
