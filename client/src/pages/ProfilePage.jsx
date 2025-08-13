import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountThunk } from '../store/authSlice';
import { getAccountOrdersThunk } from '../store/ordersSlice';
import OrdersList from '../components/Orders/OrdersList';
import styles from './Pages.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const {
    ordersAccount,
    error: errorOrders,
    isLoading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user) {
      dispatch(getAccountThunk());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (ordersAccount?.length === 0) {
      dispatch(getAccountOrdersThunk());
    }
  }, [dispatch, ordersAccount?.length]);

  if (error) {
    navigate('/login');
  }
  return (
    <section className={styles.wrapper}>
      <article className={styles['personal-info']}>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </article>
      <div>
        {isLoading && <p>Loading</p>}
        {errorOrders && <p>{errorOrders}</p>}
        {ordersAccount?.length > 0 ? (
          <OrdersList orders={ordersAccount} />
        ) : (
          <p>empty orders list</p>
        )}
      </div>
      
    </section>
  );
};

export default ProfilePage;
