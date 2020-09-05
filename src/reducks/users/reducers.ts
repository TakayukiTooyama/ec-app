import * as Actions from './actions';
import { initialState } from '../store/initialState';
import { User } from './types';
import { UserAction } from './types';

export const UsersReducer = (state: User = initialState.users, action: UserAction) => {
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
