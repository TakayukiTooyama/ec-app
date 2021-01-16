import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getIsSignedIn } from './reducks/users/selectors';
import { listenAuth } from './reducks/users/operations';
import { RootState } from './reducks/store/store';

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
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
