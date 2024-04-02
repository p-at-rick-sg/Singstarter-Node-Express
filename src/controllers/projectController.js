require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const {ProjectModel} = require('../models/projectModel');
const fs = require('fs').promises;
const path = require('path');
const {ObjectId} = require('mongodb');

const seedProject = async (req, res) => {
  try {
    await ProjectModel.deleteMany({});
    await ProjectModel.create([
      {
        _id: '6700ddf51fd1162aae22ea20',
        owner: '6607d0de21420541915eebdb',
        title: 'My cool new project',
        images: [
          {
            URL: 'https://storage.googleapis.com/ga-project-3-assets/600x400.jpg',
            description: 'placeholder 600x300',
          },
          {
            URL: 'https://storage.googleapis.com/ga-project-3-assets/300x200.jpg',
            description: 'placeholder 300x200',
          },
        ],
        qAndA: [
          {
            question: 'How many legs does a spider have in the morning?',
            answer:
              '& as one grows during their lunch break and falls off at night whjen they sleep!',
          },
          {question: 'A second question with no answer yet'},
        ],
        target: 5000,
        currentTotal: 550,
      },
    ]);
    return res.status(200).json({status: 'ok', msg: 'project seeding successful'});
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({status: 'error', msg: 'project seeding failed'});
  }
};

const getProjects = async (req, res) => {
  try {
    const allProjects = await ProjectModel.find();
    return res.status(200).json(allProjects);
  } catch (err) {
    console.error(err.message);
    return res.status(200).json({status: 'error', msg: 'failed to retrieve projects'});
  }
};

const getMyProjects = async (req, res) => {
  try {
    result = await ProjectModel.find({owner: req.decoded.id});
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'failed to get contributors projects'});
  }
};

const getQA = async (req, res) => {
  try {
    const result = await ProjectModel.findById(req.params.projectID);
    res.status(200).json(result.qAndA);
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'failed to get contributors projects'});
  }
};

const updateQ = async (req, res) => {
  try {
    const result = await ProjectModel.findByIdAndUpdate(
      req.params.projectID,
      {$push: {qAndA: {question: req.body.question}}},
      {new: true}
    );
    const newQuestionId = result.qAndA[result.qAndA.length - 1].id;
    return res.status(200).json({status: 'ok', msg: 'added question', id: newQuestionId});
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'failed to add question'});
  }
};

const updateA = async (req, res) => {
  try {
    const objID = new ObjectId(req.params.questionID);
    const test = await ProjectModel.find({'qAndA._id': objID});
    if (test.length !== 1) {
      console.log(test.length);
      console.error('questionID not unique');
      return res.status(400).json({status: 'error', msg: 'questionID is not unique'});
    }
    const test2 = await ProjectModel.find({'qAndA._id': objID}, {new: true});

    const result = await ProjectModel.findOneAndUpdate(
      {'qAndA._id': objID},
      {$set: {'qAndA.$.answer': req.body.answer}},
      {new: true}
    );
    return res.status(200).json({status: 'ok', msg: 'added answer'});
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'failed to add answer'});
  }
};

const uploadToGCP = async (file, fileOutputName) => {
  try {
    const storage = new Storage();
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const result = await bucket.upload(file, {
      destination: fileOutputName,
    });
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

const deleteFile = async filePath => {
  try {
    result = await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const uploadAsset = async (req, res) => {
  try {
    const fileSuffix = req.file.originalname.split('.').pop();
    const fileName = req.file.filename + '.' + fileSuffix;
    const result = await uploadToGCP(req.file.path, fileName);
    if (result[0].id) {
      //compose the full url
      const imageURI = process.env.IMAGE_BASE_URI + result[0].id;
      //remove the image from the local storage
      const filePath = path.resolve('uploads/', req.file.filename);
      deleteFile(filePath);
      //add the URL to the project model (need tp pull the project ID - add manually for testing)
      dbResult = await ProjectModel.findByIdAndUpdate(req.params.projectID, {
        $push: {images: {URL: imageURI, description: 'test description'}}, //need to add the desc from body
      });
      console.log(dbResult);
      //return the URL path for the caller
      return res.status(200).json({
        status: 'ok',
        msg: 'file upload successful',
        fileURL: imageURI,
      });
    } else {
      return res.status(400).json({status: 'error', msg: 'file upload failed'});
    }
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'file upload failed with error'});
  }
};

const addProject = async (req, res) => {
  console.log('on the correct func');
  try {
    const idObj = new ObjectId(req.decoded.id);
    newProject = {};
    newProject.owner = idObj;
    newProject.title = req.body.title;
    newProject.details = req.body.details;
    newProject.target = req.body.target;
    if ('endDate' in req.body) newProject.endDate = req.body.endDate;
    const result = await ProjectModel.create(newProject);
    console.log(result);
    return res.status(200).json({status: 'ok', msg: 'successfully added project', id: result._id});
  } catch (err) {
    console.error('Error: ', err);
    return res.status(400).json({status: 'error', msg: 'failed to add project'});
  }
};

module.exports = {
  seedProject,
  uploadAsset,
  getProjects,
  addProject,
  getMyProjects,
  getQA,
  updateQ,
  updateA,
};
