const express = require('express');
const { auth, isAdmin } = require('../middlewares/auth.mw');
const { validate } = require('../middlewares/validate.mw');
const {
  createOrderSchema,
  updateStatusOrderSchema,
} = require('../validators/order.validator');
const {
  createOrder,
  getAllOrders,
  getAccountOrders,
  getOrder,
  updateStatusOrder,
} = require('../controllers/order.controller');
const { paginate } = require('../middlewares/pagination.mw');
const { filterOrders } = require('../middlewares/filter.mw');

const router = express.Router();

router.post('/', auth, validate(createOrderSchema), createOrder);

router.get('/', auth, isAdmin, paginate, filterOrders, getAllOrders);
router.get('/account', auth, paginate, getAccountOrders);
router.get('/:orderId', auth, getOrder);

router.patch(
  '/:orderId',
  auth,
  isAdmin,
  validate(updateStatusOrderSchema),
  updateStatusOrder
);

module.exports = router;
