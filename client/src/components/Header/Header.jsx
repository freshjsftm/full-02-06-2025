import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../store/categoriesSlice';
import { logoutUserThunk } from '../../store/authSlice';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
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
      <div className={styles['top-header']}>
        {user ? (
          <>
            <span>Hi, {user?.name}</span>
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
      <div>
        <NavLink to="/">Logo</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
      <nav>
        <ul className={styles['main-menu']}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {categories?.map(showCategory)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
