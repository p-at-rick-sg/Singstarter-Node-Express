const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/projectMiddleware');

//Add controller imports here
const {uploadAsset} = require('../controllers/projectController');
//Import validators here

//Define endpoints and methods here

//GET

//POST
router.post('/uploadAsset', uploadAsset);
//PATCH

//DELETE

//Export
module.exports = router;

router.post('/file', upload.single('image'), uploadAsset);
