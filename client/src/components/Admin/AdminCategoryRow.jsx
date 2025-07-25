import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategoryThunk } from '../../store/categoriesSlice';

const AdminCategoryRow = (props) => {
  const dispatch = useDispatch();
  const { category, handleUpdate } = props;
  const handleDelete = (id) => {
    dispatch(deleteCategoryThunk(id));
  };
  return (
    <tr>
      <td>{category.name}</td>
      <td>
        <button onClick={() => handleUpdate(category)}>update</button>
      </td>
      <td>
        <button onClick={() => handleDelete(category._id)}>delete</button>
      </td>
    </tr>
  );
};

export default AdminCategoryRow;
