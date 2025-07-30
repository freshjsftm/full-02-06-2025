import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiSale, mdiCartArrowDown } from '@mdi/js';
import styles from './ProductsList.module.scss';
import CONSTANTS from '../../constants';
import { addToCart } from '../../store/cartSlice';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const { title, price, stockQty, isSale, images, category } = product;
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <article className={styles.product}>
      {isSale && <Icon path={mdiSale} size={1} />}
      <div className={styles.pic}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`}
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      <p>{price}</p>
      <p>{category?.name}</p>
      <p>{stockQty > 0 ? 'Available' : 'Not Available'}</p>
      <Icon path={mdiCartArrowDown} size={1} onClick={handleAddToCart} />
    </article>
  );
};

export default ProductItem;
