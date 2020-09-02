import React from 'react';
import { Switch, Route } from 'react-router';
import { SignUp, SignIn, Reset } from './components/organisms';
import Home from './components/organisms/Home';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signin/reset'} component={Reset} />
      <Route exact path={'(/)?'} component={Home} />
    </Switch>
  );
};

export default Router;
