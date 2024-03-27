const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const {signup, signin, getUsers} = require('../controllers/authController');

//Signup Endpoint
router.put('/signup', signup);

//Signin Endpoint
router.post('/signin', signin);

//get all user details endpoint
router.get('/', getUsers);

module.exports = router;
