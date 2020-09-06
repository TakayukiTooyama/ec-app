import { push } from 'connected-react-router';

import { FirebaseTimestamp, db } from '../../firebase';
import { fetchProductAction, deleteProductAction } from './actions';
import { Data, Image, Size, Product } from './types';

const productsRef = db.collection('products');

export const fetchProduct = () => {
  return async (dispatch: any) => {
    productsRef
      .orderBy('created_at', 'desc')
      .get()
      .then((snapshots) => {
        const productList: Data[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          productList.push(data);
        });
        dispatch(fetchProductAction(productList));
      });
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: any, getState: any) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts: Product[] = getState().products.list;
        const nextProducts = prevProducts.filter((product: Product) => product.id !== id);
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const addProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  iamges: Image[],
  sizes: Size[]
) => {
  return async (dispatch: any) => {
    if (name === '' || description === '' || category === '' || gender === '' || price === '') {
      alert('必須項目が未記入です。');
      return false;
    }
    const timestamp = FirebaseTimestamp.now();

    const data: Data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      updated_at: timestamp,
      images: iamges,
      sizes: sizes,
    };

    if (id === '') {
      const ref = productsRef.doc();
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return db
      .collection('products')
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'));
      });
  };
};
