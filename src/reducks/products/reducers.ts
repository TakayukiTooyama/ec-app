import * as Actions from './actions';
import { initialState } from '../store/initialState';
import { ProductList, Action } from './types';

export const ProductsReducer = (state: ProductList = initialState.products, action: Action) => {
  switch (action.type) {
    case Actions.ADD_PRODUCT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_PRODUCT:
      return {
        list: [...action.payload],
      };
    case Actions.DELETE_PRODUCT:
      return {
        list: [...action.payload],
      };
    default:
      return state;
  }
};
