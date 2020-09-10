import React from 'react';
import { Switch, Route } from 'react-router';

import Auth from './Auth';
import {
  SignUp,
  SignIn,
  Reset,
  ProductEdit,
  ProductDetail,
  ProductList,
  CartList,
  OrderConfirm,
  OrderHistory,
  UserMypage,
} from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />

      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        <Route exact path={'/product/:id'} component={ProductDetail} />
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
        {/* 新規追加と編集機能を区別するため */}

        <Route exact path={'/cart'} component={CartList} />

        <Route exact path={'/user/mypage'} component={UserMypage} />
        <Route exact path={'/user/payment/edit'} component={UserMypage} />

        <Route exact path={'/order/confirm'} component={OrderConfirm} />
        <Route exact path={'/order/history'} component={OrderHistory} />
      </Auth>
    </Switch>
  );
};

export default Router;
