const express = require("express");
const router = express.Router();
const {
  authUser,
  authContributor,
  authAdmin,
} = require("../middleware/authMiddleware");
const { upload } = require("../middleware/projectMiddleware");

//Add controller imports here
const {
  uploadAsset,
  seedProject,
  getProjects,
  addProject,
  getMyProjects,
  getQA,
  updateQ,
  updateA,
  getOrders,
  countNumProject,
  getProjectPictures,
  getProjectsBySearchTerm,
  // countNumProject,
} = require("../controllers/projectController");
//Import validators here

//Define endpoints and methods here

//GET
router.get("/seed", seedProject);
router.get("/", getProjects);
router.get("/myProjects", authContributor, getMyProjects);
router.get("/qa/:projectID", getQA);
router.get("/pictures/:projectID", getProjectPictures);
router.get("/orders", authContributor, getOrders);
router.get("/countProject", countNumProject);
router.get("/search", getProjectsBySearchTerm);
//PUT
router.put("/", authContributor, addProject);
//POST
router.post("/uploadAsset/:projectID", upload.single("image"), uploadAsset);

//PATCH
router.patch("/q/:projectID", authUser, updateQ);
router.patch("/a/:questionID", authContributor, updateA);
//DELETE

//Export
module.exports = router;
