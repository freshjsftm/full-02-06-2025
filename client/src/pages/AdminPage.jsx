import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to='/admin-panel/categories'>Categories</Link></li>
        <li><Link to='/admin-panel/products'>Products</Link></li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AdminPage;
