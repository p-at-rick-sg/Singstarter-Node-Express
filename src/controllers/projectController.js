require('dotenv').config();
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const uploadToGCP = async (file, fileOutputName) => {
  try {
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
  const fileSuffix = req.file.originalname.split('.').pop();
  const fileName = req.file.filename + '.' + fileSuffix;
  const result = await uploadToGCP(req.file.path, fileName);
  const imageURI = process.env.IMAGE_BASE_URI + result[0].id;
  return res.status(200).json({
    status: 'ok',
    msg: 'file upload successful',
    fileURL: imageURI,
  });
};

module.exports = {uploadAsset};
