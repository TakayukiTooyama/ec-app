import React from 'react';
import { Switch, Route } from 'react-router';
import Auth from './Auth';
import ProductList from './templates/ProductList';
import { SignUp, SignIn, Reset, ProductEdit } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        {/* 新規追加と編集機能を区別するため */}
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
