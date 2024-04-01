const express = require('express');
const router = express.Router();
const {createCheckout} = require('../controllers/paymentController');

router.post('/create-checkout-session', createCheckout);

module.exports = router;
