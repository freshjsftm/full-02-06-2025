import React from 'react';
import { useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import CONSTANTS from '../../constants';
import styles from './Product.module.scss';
import { addToCart } from '../../store/cartSlice';


const Product = (props) => {
  const { product } = props;
  const { title, price, images, description, stockQty, category } = product;
  const dispatch = useDispatch();

  const imagesGallery = images.map((img) => ({
    original: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
    thumbnail: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
  }));

  const handleAddToCart = ()=>{
    dispatch(addToCart(product))
  }

  return (
    <article className={styles.product}>
      <div className={styles.images}>
        <ImageGallery
          items={imagesGallery}
          showPlayButton={false}
          showNav={false}
        />
      </div>
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>category: {category?.name}</p>
        <p>{price} uah</p>
        <p>{description}</p>
        <p>available: {stockQty}</p>
        <button onClick={handleAddToCart}>add to cart</button>
      </div>
    </article>
  );
};

export default Product;
