import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiPurseOutline } from '@mdi/js';
import { getAllCategoriesThunk } from '../../store/categoriesSlice';
import { logoutUserThunk } from '../../store/authSlice';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { items } = useSelector((state) => state.cart);
  const total = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);
  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );
  const logout = () => dispatch(logoutUserThunk());
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles['top-header']}>
          {user ? (
            <>
              <Link to="/account">Hi, {user?.name}</Link>
              {user?.role === 'admin' && (
                <Link to="/admin-panel">Admin Panel</Link>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link> |{' '}
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
        <div className={styles['middle-header']}>
          <NavLink className={styles.logo} to="/">
            <img src="/logo.png" alt="" />
          </NavLink>
          <NavLink to="/cart" className={styles.cart}>
            <span className={styles.badge}>{items.length}</span>
            <Icon path={mdiPurseOutline} size={2} />
            <div className={styles['cart-info']}>
              <div>Shopping cart: </div>
              <div className={styles.price}>{total.toFixed(2)} usd</div>
            </div>
          </NavLink>
        </div>
        <nav>
          <ul className={styles['main-menu']}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {categories?.map(showCategory)}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
