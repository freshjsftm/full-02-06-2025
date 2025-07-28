import React from 'react';
import CONSTANTS from '../../constants';
import { useDispatch } from 'react-redux';
import { deleteProductThunk } from '../../store/productsSlice';

const AdminProductRow = (props) => {
  const {product, handleUpdate} = props;
  const {_id, title, description, price, stockQty, category, isSale, images} = product;
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProductThunk(id))
  }
  const showImages = (img, i) => <img key={i} style={{width:'30px'}}
  src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`} 
  alt={title}/>
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{stockQty}</td>
      <td>{category?.name}</td>
      <td>{isSale?'yes':'no'}</td>
      <td>{ images.map(showImages) } </td>
      <td><button onClick={()=>{handleUpdate(product)}}>update</button></td>
      <td><button onClick={()=>{handleDelete(_id)}}>delete</button></td>
    </tr>
  );
};

export default AdminProductRow;
