import { push } from 'connected-react-router';

import { FirebaseTimestamp, db } from '../../firebase';
import { fetchProductAction, deleteProductAction } from './actions';
import {
  Product,
  Image,
  Size,
  MyThunkDispatch,
  MyTunkProductsResult,
  MyTunkUsersResult,
} from './types';
import { Cart, FlexibleOrderProduct, Order } from '../users/types';

const productsRef = db.collection('products');

export const fetchProduct = (gender: string, category: string) => {
  return async (dispatch: MyThunkDispatch) => {
    let query = productsRef.orderBy('created_at', 'desc');
    query = gender !== '' ? query.where('gender', '==', gender) : query;
    query = category !== '' ? query.where('category', '==', category) : query;
    query.get().then((snapshots) => {
      const productList: Product[] = [];
      snapshots.forEach((snapshot) => {
        const data = snapshot.data() as Product;
        productList.push(data);
      });
      dispatch(fetchProductAction(productList));
    });
  };
};

export const orderProduct = (productInCart: Cart[], amount: number): MyTunkUsersResult<void> => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const usersRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    const batch = db.batch();

    let products: FlexibleOrderProduct = {},
      soldOutProducts: string[] = [];

    for (const product of productInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const data = snapshot.data() as Product;
      const sizes = data.sizes;

      const updatedSizes = sizes.map((size) => {
        //今回選んだ者と一致していることを確認
        if (size.size === product.size) {
          //商品が売り切れていないか確認
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size;
          } else {
            return {
              sizeId: size.sizeId,
              size: size.size,
              quantity: size.quantity - 1,
            };
          }
        } else {
          //今回選んだsizeではないものはそのまま返す
          return size;
        }
      });

      products[product.productId] = {
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      };

      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes });

      batch.delete(usersRef.collection('cart').doc(product.cartId));
    }
    if (soldOutProducts.length > 0) {
      const message = soldOutProducts.length > 1 ? soldOutProducts.join('と') : soldOutProducts[0];
      alert(`申し訳ありません。${message}が売り切れのためもう一度最初からやり直してください。`);
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const ordersRef = usersRef.collection('orders').doc();
          const orderId = ordersRef.id;
          const data = timestamp.toDate();
          const shippingData = FirebaseTimestamp.fromDate(
            new Date(data.setDate(data.getDate() + 3))
          );
          const history: Order = {
            id: orderId,
            amount: amount,
            created_at: timestamp,
            products: products,
            shipping_at: shippingData,
            updated_at: timestamp,
          };
          ordersRef.set(history);
          dispatch(push('/order/complete'));
        })
        .catch(() => {
          alert('注文処理に失敗しました。通信環境をお確かめのうえ、もう一度お試しください。');
          return false;
        });
    }
  };
};

export const deleteProduct = (id: string): MyTunkProductsResult<void> => {
  return async (dispatch, getState) => {
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

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: number,
  fbChecked: boolean,
  images: Image[],
  sizes: Size[]
) => {
  return async (dispatch: MyThunkDispatch) => {
    if (name === '' || description === '' || category === '' || gender === '' || price === 0) {
      alert('必須項目が未記入または価格が0円です。');
      return false;
    }
    const timestamp = FirebaseTimestamp.now();

    const noImages: Image[] = [
      { id: `${name}-noImage`, path: 'http://placehold.jp/250x250.png?text=NO IMAGE' },
    ];

    const data: Product = {
      id: id,
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(String(price), 10),
      images: images.length ? images : noImages,
      sizes: sizes,
      fbChecked: fbChecked,
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
