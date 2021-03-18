import { auth, FirebaseTimestamp, db, fb } from '../../firebase';
import { push } from 'connected-react-router';
import {
  signInAction,
  signOutAction,
  fetchProductInCartAction,
  fetchOrdersHistoryAction,
  fetchProductInFavoriteAction,
  removeProductFavoriteAction,
} from './actions';
import { Cart, User, MyThunkDispatch, MyTunkResult, FlexibleOrderProduct, Favorite } from './types';
import { MyTunkUsersResult, Product, Size } from '../products/types';

export const addProductToCart = (addProduct: Cart & Favorite): MyTunkResult<void> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = db.collection('users').doc(uid).collection('cart').doc();
    addProduct['cartId'] = cartRef.id;
    cartRef.set(addProduct).then(() => {
      dispatch(push('/cart'));
    });
  };
};

export const addProductToFavorite = (addProduct: Favorite): MyTunkResult<void> => {
  return async (_dispatch, getState) => {
    const uid = getState().users.uid;
    const favoriteRef = db.collection('users').doc(uid).collection('favorites');
    favoriteRef.doc(addProduct.sizeId).set(addProduct);
  };
};

export const removeProductFromFavorite = (
  selectedProduct: Product,
  newSizes: Size[],
  newFavorites: Favorite[]
): MyTunkResult<void> => {
  return async (dispatch, _getState) => {
    const productsRef = db.collection('products').doc(selectedProduct.id);
    productsRef.update({ sizes: newSizes }).then(() => {
      dispatch(removeProductFavoriteAction(newFavorites));
    });
  };
};

export const fetchProductInCart = (productInCart: Cart[]) => {
  return async (dispatch: MyThunkDispatch) => {
    dispatch(fetchProductInCartAction(productInCart));
  };
};

export const fetchProductInFavorite = (productInFavorite: Favorite[]) => {
  return async (dispatch: MyThunkDispatch) => {
    dispatch(fetchProductInFavoriteAction(productInFavorite));
  };
};

export const fetchOrdersHistory = (): MyTunkUsersResult<void> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const ordersRef = db.collection('users').doc(uid).collection('orders');
    const list: FlexibleOrderProduct[] = [];

    ordersRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push(data);
          dispatch(fetchOrdersHistoryAction(list));
        });
      });
  };
};

export const listenAuth = () => {
  return async (dispatch: MyThunkDispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        return db
          .collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as User;

            dispatch(
              signInAction({
                uid: uid,
                username: data.username,
                role: data.role,
                isSignedIn: true,
                cart: data.cart,
                orders: data.orders,
                favorites: data.favorites,
              })
            );
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirPassword: string
) => {
  return async (dispatch: MyThunkDispatch) => {
    if (username === '' || email === '' || password === '' || confirPassword === '') {
      alert('必須項目が未入力です');
      return false;
    }
    if (password !== confirPassword) {
      alert('パスワードが一致しません。もう1度お試しください。');
      return false;
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください');
      return false;
    }
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          username: username,
          email: email,
          uid: uid,
          role: 'customer',
          created_at: timestamp,
          updated_at: timestamp,
        };

        return db
          .collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: MyThunkDispatch) => {
    if (email === '' || password === '') {
      alert('メールアドレスかパスワードが未入力です。');
      return false;
    }
    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        return db
          .collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data() as User;

            dispatch(
              signInAction({
                uid: uid,
                username: data.username,
                role: data.role,
                isSignedIn: true,
                cart: data.cart,
                orders: data.orders,
                favorites: data.favorites,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch: any) => {
    return auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    });
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      alert('メッセージを送りました。');
      dispatch(push('/signin'));
    });
  };
};

export const googleAuth = () => {
  return async (dispatch: any) => {
    const provider = new fb.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const username = user.displayName;
        const email = user.email;
        const timestamp = FirebaseTimestamp.now();

        const googleUserData = {
          username: username,
          email: email,
          uid: uid,
          role: 'customer',
          created_at: timestamp,
          updated_at: timestamp,
        };

        return db
          .collection('users')
          .doc(uid)
          .set(googleUserData)
          .then(() => {
            dispatch(push('/'));
          });
      }
    });
  };
};
export const anonymousAuth = () => {
  return async (dispatch: any) => {
    return auth.signInAnonymously().then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();

        const anonymousUserData = {
          username: 'デモ太朗',
          email: '',
          uid: uid,
          role: 'customer',
          created_at: timestamp,
          updated_at: timestamp,
        };

        return db
          .collection('users')
          .doc(uid)
          .set(anonymousUserData)
          .then(() => {
            dispatch(push('/'));
          });
      }
    });
  };
};
