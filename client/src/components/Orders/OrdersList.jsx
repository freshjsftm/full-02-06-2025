import React from 'react';
import OrderRow from './OrderRow';

const OrdersList = (props) => {
  const { orders } = props;
  const showOrderRow = (order) => <OrderRow key={order._id} order={order} />;
  return (
    <table>
      <thead>
        <tr>
          <th>order id</th>
          <th>data</th>
          <th>total summa</th>
          <th>status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{orders.map(showOrderRow)}</tbody>
    </table>
  );
};

export default OrdersList;
