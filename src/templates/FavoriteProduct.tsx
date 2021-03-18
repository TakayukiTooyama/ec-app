import React, { useEffect } from 'react';
import { List } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Favorite } from '../reducks/users/types';
import { getFavoriteProducts } from '../reducks/users/selectors';
import { fetchProductInFavorite } from '../reducks/users/operations';
import { FavoriteListItem } from '../components/Products';
import { RootState } from '../reducks/store/store';

const FavoriteProduct = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const favorites = getFavoriteProducts(selector);

  useEffect(() => {
    dispatch(fetchProductInFavorite(favorites));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">お気に入り</h2>
      <div className="module-spacer--medium"></div>
      <List>
        {favorites.length > 0 &&
          favorites.map((favorite: Favorite) => (
            <FavoriteListItem
              key={favorite.sizeId}
              sizeId={favorite.sizeId}
              favorite={favorite}
              name={favorite.name}
              size={favorite.size}
              price={favorite.price}
              images={favorite.images}
            />
          ))}
      </List>
    </div>
  );
};

export default FavoriteProduct;
