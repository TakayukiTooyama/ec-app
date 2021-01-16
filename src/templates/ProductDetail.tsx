import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { db, FirebaseTimestamp } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import HTMLReactParser from 'html-react-parser';
import ImageSwiper from '../components/Products/ImageSwiper';
import { SizeTable } from '../components/Products';
import { addProductToCart, addProductToFavorite } from '../reducks/users/operations';
import { Product } from '../reducks/products/types';
import { getFavoriteProducts, getUid } from '../reducks/users/selectors';
import { removeProductFavoriteAction } from '../reducks/users/actions';
import { RootState } from '../reducks/store/store';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  const uid = getUid(selector);
  const favorites = getFavoriteProducts(selector);
  const [product, setProduct] = useState<Product | null>(null);
  const [fbChecked, setFbChecked] = useState(false);
  const path = selector.router.location.pathname;
  const id = path.split('/product/')[1];

  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((res) => {
        const data = res.data() as Product;
        setProduct(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //説明に改行をいれるため
  const returnCodeToBr = (text: string) => {
    if (text === '') {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'));
    }
  };

  const addProduct = useCallback(
    (selectSize: string, sizeId: string) => {
      const timestamp = FirebaseTimestamp.now();
      if (product === null) {
        return false;
      }
      dispatch(
        addProductToCart({
          added_at: timestamp,
          productId: product.id,
          price: product.price,
          description: product.description,
          gender: product.gender,
          name: product.name,
          images: product.images,
          sizeId: sizeId,
          quantity: 1,
          size: selectSize,
          fbChecked: false,
        })
      );
    },
    [product, dispatch]
  );

  const addFavorite = useCallback(
    (selectSize: string, sizeId: string, fbChecked: boolean) => {
      const timestamp = FirebaseTimestamp.now();
      if (product === null) {
        return false;
      }
      setFbChecked(true);
      dispatch(
        addProductToFavorite({
          added_at: timestamp,
          productId: product.id,
          price: product.price,
          description: product.description,
          gender: product.gender,
          name: product.name,
          images: product.images,
          quantity: 1,
          size: selectSize,
          sizeId: sizeId,
          fbChecked: fbChecked,
        })
      );
    },
    [product, dispatch]
  );

  const removeFavorite = useCallback(
    (sizeId: string) => {
      const favoritesRef = db.collection('users').doc(uid).collection('favorites');
      favoritesRef
        .doc(sizeId)
        .delete()
        .then(() => {
          const newFavorites = favorites.filter((favorite) => favorite.sizeId !== sizeId);
          setFbChecked(false);
          dispatch(removeProductFavoriteAction(newFavorites));
        });
    },
    [uid, dispatch, favorites]
  );

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>￥{product.price.toLocaleString()}</p>
            <div className="module-spacer--small"></div>
            <SizeTable
              addProduct={addProduct}
              addFavorite={addFavorite}
              sizes={product.sizes}
              fbChecked={fbChecked}
              removeFavorite={removeFavorite}
            />
            <div className="module-spacer--small"></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
