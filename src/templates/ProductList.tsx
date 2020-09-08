import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from '../components/Products/ProductCard';
import { fetchProduct } from '../reducks/products/operations';
import { getProductsList } from '../reducks/products/selectors';
import { Products, Product } from '../reducks/products/types';

function ProudctList() {
  const dispatch = useDispatch();
  const selector = useSelector((state: Products) => state);
  const products = getProductsList(selector);

  useEffect(() => {
    dispatch(fetchProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
