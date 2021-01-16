import { createSelector } from 'reselect';
import { RootState } from '../store/store';

const usersSelector = (state: RootState) => state.users;

export const getUid = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector([usersSelector], (state) => state.username);

export const getRole = createSelector([usersSelector], (state) => state.role);

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn);

export const getCart = createSelector([usersSelector], (state) => state.cart);

export const getOrderHistory = createSelector([usersSelector], (state) => state.orders);

export const getFavoriteProducts = createSelector([usersSelector], (state) => state.favorites);
