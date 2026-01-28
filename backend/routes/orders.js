const express = require('express');
const {
  createPaymentIntent,
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/payment-intent', auth, createPaymentIntent);
router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.get('/admin/all', auth, adminOnly, getAllOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, adminOnly, updateOrderStatus);

module.exports = router;
