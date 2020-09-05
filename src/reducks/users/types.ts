export type Users = {
  users: {
    uid: string;
    username: string;
    role: string;
    isSignedIn: boolean;
    // cart: Cart[];
  };
};

export type User = {
  uid: string;
  username: string;
  role: string;
  isSignedIn: boolean;
  // cart: Cart[];
};

// export type Cart = {
//   cartId: string;
//   cartTitle: string;
//   price: number;
//   size: string;
// };

type TypeAction = 'SIGN_IN' | 'SIGN_UP' | 'SIGN_OUT';
export type UserAction = {
  type: TypeAction;
  payload: User;
};
