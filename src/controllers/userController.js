const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const seedUser = async (req, res) => {
  console.log('seeding users');
  try {
    const passwordHash1 = await bcrypt.hash('password', 12);
    const passwordHash2 = await bcrypt.hash('password', 12);
    const passwordHash3 = await bcrypt.hash('password', 12);
    await UserModel.deleteMany({});
    await UserModel.create([
      {
        _id: '6700de6b1fd1162aae22ee20',
        email: 'user@test.com',
        passwordHash: passwordHash1, //const passwordHash = await bcrypt.hash(password, 12);
        firstName: 'UserFirst',
        lastName: 'UserLast',
        address1: '21 Some street',
        town: 'Bugis',
        country: 'singapore',
        postcode: '123456',
        role: 'user',
      },
      {
        _id: '6700de6b1fd1162aae22ff30',
        email: 'contributor@test.com',
        passwordHash: passwordHash2,
        firstName: 'ContribFirst',
        lastName: 'ContribLast',
        address1: '21 Some street',
        town: 'Punggol',
        country: 'singapore',
        postcode: '789789',
        role: 'contributor',
        company: 'Awesome Company',
      },
      {
        _id: '6700de6b1fd1162aae22ff55',
        email: 'admin@test.com',
        passwordHash: passwordHash3,
        firstName: 'AdminFirst',
        lastName: 'AdminLast',
        address1: 'The best Street',
        address2: 'in the best tower block complex',
        town: 'Sentosa',
        country: 'singapore',
        postcode: '996699',
        role: 'admin',
      },
    ]);
    return res.status(200).json({status: 'ok', msg: 'user seeding successful'});
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({status: 'error', msg: 'user seeding failed'});
  }
};

const getUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.decoded.id);
    res.status(200).json(result);
  } catch (err) {
    console.error('failed to get user details');
    return res.status(400).json({error: err, msg: 'cannot retieve user details'});
  }
};

module.exports = {seedUser, getUser};
