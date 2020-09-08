import { createSelector } from 'reselect';
import { Users } from './types';

const usersSelector = (state: Users) => state.users;

export const getUid = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector([usersSelector], (state) => state.username);

export const getRole = createSelector([usersSelector], (state) => state.role);

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn);

export const getCart = createSelector([usersSelector], (state) => state.cart);
