import { createSelector } from 'reselect';

import { Products } from './types';

const productsSelector = (state: Products) => state.products;

export const getProductsList = createSelector([productsSelector], (state) => state.list);
