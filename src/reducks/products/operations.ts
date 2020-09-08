import { push } from 'connected-react-router';

import { FirebaseTimestamp, db } from '../../firebase';
import { fetchProductAction, deleteProductAction } from './actions';
import { ProductData, Image, Size, MyThunkDispatch, MyTunkResult } from './types';

const productsRef = db.collection('products');

export const fetchProduct = () => {
  return async (dispatch: MyThunkDispatch) => {
    productsRef
      .orderBy('created_at', 'desc')
      .get()
      .then((snapshots) => {
        const productList: ProductData[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as ProductData;
          productList.push(data);
        });
        dispatch(fetchProductAction(productList));
      });
  };
};

export const deleteProduct = (id: string): MyTunkResult<Promise<void>> => {
  return async (dispatch, getState) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts: ProductData[] = getState().products.list;
        const nextProducts = prevProducts.filter((product: ProductData) => product.id !== id);
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: number,
  iamges: Image[],
  sizes: Size[]
) => {
  return async (dispatch: MyThunkDispatch) => {
    if (name === '' || description === '' || category === '' || gender === '' || price === 0) {
      alert('必須項目が未記入または価格が0円です。');
      return false;
    }
    const timestamp = FirebaseTimestamp.now();

    const data: ProductData = {
      id: id,
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(String(price), 10),
      images: iamges,
      sizes: sizes,
      updated_at: timestamp,
    };

    if (id === '') {
      const ref = productsRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
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
