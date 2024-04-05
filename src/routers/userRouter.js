const express = require('express');
const router = express.Router();
const {authUser, authContributor, authAdmin} = require('../middleware/authMiddleware');
const {
  seedUser,
  getUser,
  getAllUser,
  updateUser,
  countUsersByRole,
} = require('../controllers/userController');

//get logged in user details endpoint
router.get('/seed', seedUser);
router.get('/', authUser, getUser);
router.get('/all', getAllUser);
router.get('/count', countUsersByRole);

//Patch
router.patch('/update', authUser, updateUser);

// payment endpoints
router.get('/payment');
router.post('/payment');

module.exports = router;
