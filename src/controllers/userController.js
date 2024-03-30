const UserModel = require('../models/userModel');

const getUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.id);
    if (result.email === req.body.email) {
      res.status(200).json(result);
    } else res.status(400).json({status: 'error', msg: 'no access to requested user'});
  } catch (err) {
    console.error('failed to get user details');
    return res.status(400).json({error: err, msg: 'cannot retieve user details'});
  }
};

module.exports = {getUser};
