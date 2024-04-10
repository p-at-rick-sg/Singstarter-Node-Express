const express = require('express');
const router = express.Router();
const {authUser, authContributor, authAdmin} = require('../middleware/authMiddleware');
const {createCheckout, getSuccessDetails} = require('../controllers/paymentController');

router.post('/create-checkout-session', createCheckout);
router.patch('/success', authUser, getSuccessDetails);

module.exports = router;
