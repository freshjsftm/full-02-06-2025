import React from 'react';
import Icon from '@mdi/react';
import { mdiSale } from '@mdi/js';
import styles from './ProductsList.module.scss';
import CONSTANTS from '../../constants';

const ProductItem = (props) => {
  const {
    product: { title, price, stockQty, isSale, images, category },
  } = props;
  return (
    <article className={styles.product}>
      {isSale && <Icon path={mdiSale} />}
      {isSale && <p>sale</p>}
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
    </article>
  );
};

export default ProductItem;
