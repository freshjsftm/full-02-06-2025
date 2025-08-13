import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountThunk } from '../store/authSlice';
import styles from './Pages.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getAccountThunk());
    }
  }, [dispatch, user]);
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
    </section>
  );
};

export default ProfilePage;
