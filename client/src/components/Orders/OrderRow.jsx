import React from 'react';

const OrderRow = (props) => {
  const {order} = props;
  const {_id,createdAt, totalSumma , status} = order;
  return (
    <tr>
      <td>{_id}</td>
      <td>{createdAt.slice(0,10)}</td>
      <td>{totalSumma} usd</td>
      <td>{status}</td>
      <td><button>view detail</button></td>
    </tr>
  );
}

export default OrderRow;
