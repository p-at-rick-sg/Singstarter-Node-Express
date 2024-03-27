const express = require('express');
const router = express.Router();
const {getUsers} = require('../controllers/userController');

//get all user details endpoint
router.get('/', getUsers);
