import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { ConnectRouter } from '../reducks/products/types';
import HTMLReactParser from 'html-react-parser';
import ImageSwiper from '../components/Products/ImageSwiper';
import { SizeTable } from '../components/Products';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px',
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
      margin: '0 auto 16px',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const [product, setProduct] = useState<firebase.firestore.DocumentData | undefined | null>(null);
  const selector = useSelector((state: ConnectRouter) => state);
  const path = selector.router.location.pathname;
  const id = path.split('/product/')[1];

  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((res) => {
        const data = res.data();
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

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p>￥{product.price.toLocaleString()}</p>
            {/* <TabelSize/> */}
            <p>{returnCodeToBr(product.description)}</p>
            <div className="module-spacer--small"></div>
            <SizeTable sizes={product.sizes} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
