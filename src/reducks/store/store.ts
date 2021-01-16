import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { History } from 'history';

// Import reducers
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import { User } from '../users/types';
import { Product, ProductList, Products } from '../products/types';

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history: History) {
  // Define individual settings of redux-logger
  let middleWares = [routerMiddleware(history), thunk];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      diff: true,
    });
    middleWares.push(logger);
  }

  return reduxCreateStore(
    // オリジナル createStore の別名
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(...middleWares)
  );
}

export type RootState = {
  router: RouterState<History.UnknownFacade>;
  users: User;
  products: ProductList;
};
