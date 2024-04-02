const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/projectMiddleware');

//Add controller imports here
const {uploadAsset, seedProject, getProjects} = require('../controllers/projectController');
//Import validators here

//Define endpoints and methods here

//GET
router.get('/seed', seedProject);
router.get('/', getProjects);
//POST
router.post('/uploadAsset/:projectID', upload.single('image'), uploadAsset);
//PATCH

//DELETE

//Export
module.exports = router;
