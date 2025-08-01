import * as yup from 'yup';
import CONSTANTS from '../constants';

export const orderDiliverySchema = yup.object({
  shippingPhone: yup.string().trim().matches().required(),
  shippingMethod: yup.string().oneOf(CONSTANTS.SHIPPING_METHOD),
  shippingAddress: yup.string().trim()
});
