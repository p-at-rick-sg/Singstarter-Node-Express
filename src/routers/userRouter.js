const express = require('express');
const router = express.Router();
const {authUser, authContributor, authAdmin} = require('../middleware/authMiddleware');
const {getUser} = require('../controllers/userController');

//get logged in user details endpoint
router.get('/:id', authUser, getUser);
// payment endpoints
router.get('/payment');
router.post('/payment');

module.exports = router;
