import { createSelector } from 'reselect';

import { ProductList } from './types';

const productsSelector = (state: ProductList) => state;

export const getProductsList = createSelector([productsSelector], (state) => state.list);
