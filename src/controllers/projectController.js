require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const ProjectModel = require('../models/projectModel');

const seedProject = async (req, res) => {
  try {
    await ProjectModel.deleteMany({});
    await ProjectModel.create([
      {
        _id: '6700ddf51fd1162aae22ea20',
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
    return res.status(400).json({status: 'error', msg: 'seeding failed'});
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

const uploadAsset = async (req, res) => {
  try {
    const fileSuffix = req.file.originalname.split('.').pop();
    const fileName = req.file.filename + '.' + fileSuffix;
    const result = await uploadToGCP(req.file.path, fileName);
    const imageURI = process.env.IMAGE_BASE_URI + result[0].id;
    return res.status(200).json({
      status: 'ok',
      msg: 'file upload successful',
      fileURL: imageURI,
    });
  } catch (err) {
    console.error('Error: ', err);
    return res.statrus(400).json({status: 'error', msg: 'file upload failed'});
  }
};

module.exports = {uploadAsset, seedProject};
