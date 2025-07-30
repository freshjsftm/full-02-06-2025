import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const total = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const showItem = (item) => <CartItem key={item._id} item={item} />;
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <section>
      {items?.length === 0 && <p>empty cart</p>}
      <ul>{items?.map(showItem)}</ul>
      {items?.length > 0 && <button onClick={handleClear}>clear cart</button>}
      <p>total: {total.toFixed(2)} uah</p>
    </section>
  );
};

export default Cart;
