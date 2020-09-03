import * as Actions from './actions';
import { initialState } from '../store/initialState';
import { User } from './types';
import { Action } from './types';

export const UsersReducer = (state: User = initialState.users, action: Action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
