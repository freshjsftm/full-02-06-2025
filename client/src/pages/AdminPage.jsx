import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Pages.module.scss';

const AdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Admin Panel</h2>
      <ul className={styles['admin-menu']}>
        <li>
          <NavLink to="/admin-panel/categories">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/admin-panel/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/admin-panel/orders">Orders</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminPage;
