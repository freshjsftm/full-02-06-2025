import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from '../../store/categoriesSlice';
import { logoutUserThunk } from '../../store/authSlice';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories, error, isLoading } = useSelector(
    (state) => state.categories
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
  const logout = ()=>dispatch(logoutUserThunk())
  return (
    <header>
      <div className={styles['top-header']}>
        {user ? (
          <>
            <span>Hi, {user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link> |{' '}
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
      <nav>
        <ul className={styles['main-menu']}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoading && <p>Loading</p>}
          {error && <p>{error}</p>}
          {categories?.map(showCategory)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
