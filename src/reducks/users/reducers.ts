import { initialState } from '../store/initialState';
import {
  User,
  UserActionType,
  FETCH_PRODUCT_IN_CART,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  FETCH_ORDERS_HISTORY,
  FETCH_PRODUCT_IN_FAVORITE,
  REMOVE_PRODUCT_FAVORITE,
  ADD_PRODUCT_TO_FAVORITE,
} from './types';

export const UsersReducer = (state: User = initialState.users, action: UserActionType) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_FAVORITE:
      return {
        ...state,
        favorites: [{ ...action.payload }],
      };
    case REMOVE_PRODUCT_FAVORITE:
      return {
        ...state,
        favorites: action.payload,
      };
    case FETCH_PRODUCT_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case FETCH_PRODUCT_IN_FAVORITE:
      return {
        ...state,
        favorites: [...action.payload],
      };
    case FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload],
      };
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
