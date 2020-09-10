import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from '../components/Products/ProductCard';
import { fetchProduct } from '../reducks/products/operations';
import { getProductsList } from '../reducks/products/selectors';
import { Products, Product, ConnectRouter } from '../reducks/products/types';

function ProudctList() {
  const dispatch = useDispatch();
  const selector = useSelector((state: Products & ConnectRouter) => state);
  const products = getProductsList(selector);
  const query = selector.router.location.search;
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : '';
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

  useEffect(() => {
    dispatch(fetchProduct(gender, category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="c-section-wrapin">
      <div className="p-grid__row">
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
    </div>
  );
}

export default ProudctList;
