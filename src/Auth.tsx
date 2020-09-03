import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from './reducks/users/selectors';
import { Users } from './reducks/users/types';
import { listenAuth } from './reducks/users/operations';

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: Users) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
