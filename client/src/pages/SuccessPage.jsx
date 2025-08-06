import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOrderStatusThunk } from '../store/ordersSlice';

const SuccessPage = () => {
  const { idOrder } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateOrderStatusThunk({ id: idOrder, status: 'paid' }));
  }, [dispatch, idOrder]);

  return (
    <section>
      <h2>Thanks!</h2>
      <Link to="/">return to shop</Link>
    </section>
  );
};

export default SuccessPage;
