import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '@material-ui/core';

import { OrderHistoryItem } from '../components/Products';
import { fetchOrdersHistory } from '../reducks/users/operations';
import { getOrderHistory } from '../reducks/users/selectors';
import { RootState } from '../reducks/store/store';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const orders = getOrderHistory(selector);

  useEffect(() => {
    dispatch(fetchOrdersHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="c-section-wrapin">
      <div className="module-spacer--extra-small"></div>
      <List>
        {orders.length > 0 &&
          orders.map((order) => <OrderHistoryItem key={order.id} order={order} />)}
      </List>
    </div>
  );
};

export default OrderHistory;
