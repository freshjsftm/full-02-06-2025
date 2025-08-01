import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CONSTANTS from '../../constants';
import { orderDiliverySchema } from '../../validation/order.validate';
import { createOrderThunk } from '../../store/ordersSlice';
import { clearCart } from '../../store/cartSlice';

const CartDeliveryForm = (props) => {
  const { items } = props;
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const orderValues = {
      products: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      ...values,
      shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
    };
    const order = await dispatch(createOrderThunk(orderValues));

    dispatch(clearCart());
  };
  return (
    <Formik
      initialValues={{
        shippingPhone: '',
        shippingMethod: CONSTANTS.SHIPPING_METHOD[0],
        shippingAddress: '',
      }}
      validationSchema={orderDiliverySchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <label>
              <span>phone</span>
              <Field name="shippingPhone" type="tel" />
              <ErrorMessage name="shippingPhone" />
            </label>
            <label>
              <span>method</span>
              <Field name="shippingMethod" as="select">
                {CONSTANTS.SHIPPING_METHOD.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="shippingMethod" />
            </label>
            <label>
              <span>address</span>
              <Field name="shippingAddress" type="text" />
              <ErrorMessage name="shippingAddress" />
            </label>
            <button type="submit">create order and payment</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CartDeliveryForm;
