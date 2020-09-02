import { User } from './types';

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState: User) => {
  return {
    type: 'SIGN_IN',
    payload: {
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
      isSignedIn: true,
    },
  };
};

export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (userState: User) => {
  return {
    type: 'SIGN_UP',
    payload: {
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
      isSignedIn: true,
    },
  };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      uid: '',
      username: '',
      role: '',
      isSignedIn: false,
    },
  };
};
