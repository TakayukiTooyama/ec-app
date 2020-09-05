import React, { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { getProductsList } from '../reducks/products/selectors';
import { Products, Product } from '../reducks/products/types';
import ProductCard from '../components/Products/ProductCard';
import { fetchProduct } from '../reducks/products/operations';

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

function ProudctList() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: Products) => state);
  const products = getProductsList(selector);

  useEffect(() => {
    dispatch(fetchProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {products.length > 0 &&
        products.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            images={product.images}
            name={product.name}
            price={product.price}
          />
        ))}
    </div>
  );
}

export default ProudctList;
