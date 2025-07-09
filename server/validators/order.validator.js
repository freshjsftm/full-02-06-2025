const Yup = require('yup');
const CONSTANTS = require('../constants');

module.exports.createOrderSchema = Yup.object({
  products: Yup.array().of(
    Yup.object({
      productId: Yup.string().trim().required(),
      quantity: Yup.number().min(1),
    })
  ),
  shippingPhone: Yup.string().trim().required(),
  shippingMethod: Yup.string().oneOf(CONSTANTS.SHIPPING_METHOD),
  shippingAddress: Yup.string().trim(),
  shippingPrice: Yup.number().min(0),
});
