import React from 'react';
import { Order } from '../../reducks/users/types';
import { TextDetail } from '../UIkit';
import { Divider } from '@material-ui/core';
import { OrderProducts } from './index';

type Props = {
  order: Order;
};

const datetimeToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + (date.getMonth() + 1)).slice(2) +
    '-' +
    ('00' + date.getDate()).slice(2) +
    '-' +
    ('00' + date.getHours()).slice(2) +
    '-' +
    ('00' + date.getMinutes()).slice(2) +
    '-' +
    ('00' + date.getSeconds()).slice(2)
  );
};

const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    ('00' + date.getMonth()).slice(2) +
    '-' +
    ('00' + date.getDate()).slice(2)
  );
};

const OrderHistoryItem = ({ order }: Props) => {
  const orderDatetime = datetimeToString(order.updated_at.toDate());
  const shippingDatetime = dateToString(order.shipping_at.toDate());
  const products = order.products;
  return (
    <div>
      <TextDetail label="注文ID" value={order.id} />
      <TextDetail label="注文日時" value={orderDatetime} />
      <TextDetail label="発送予定日" value={shippingDatetime} />
      <TextDetail label="注文金額" value={`￥${order.amount.toLocaleString()}`} />
      {Object.keys(products).length > 0 && <OrderProducts products={products} />}
      <div className="module-spacer--extra-extra-small"></div>
      <Divider />
    </div>
  );
};

export default OrderHistoryItem;
