const {ProjectModel, OrderModel} = require('../models/projectModel');
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
        _id: '6700de6b1fd1162aae22ff31',
        email: 'contributor2@test.com',
        passwordHash: passwordHash2,
        firstName: 'ContributeSecond',
        lastName: 'ContribLast',
        address1: 'somwhere',
        town: 'Bedok',
        country: 'singapore',
        postcode: '545334',
        role: 'contributor',
        company: 'The Good Company',
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

const seedOrder = async (req, res) => {
  console.log('Seeding orders');
  try {
    await OrderModel.deleteMany({});
    await OrderModel.create([
      {
        projectID: '6700ddf51fd1162aae22ea20',
        userID: '6700de6b1fd1162aae22ee20',
        totalValue: 100,
        paymentID: 'pi_3P0bdFLxC0YAsxAS0PiWmldC',
      },
    ]);
    return res.status(200).json({status: 'ok', msg: 'seeded an order'});
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

const updateUser = async (req, res) => {
  const updatedUser = {};
  if ('firstName' in req.body) updatedUser.firstName = req.body.firstName;
  if ('lastName' in req.body) updatedUser.lasstName = req.body.lastName;
  if ('address1' in req.body) updatedUser.address1 = req.body.address1;
  if ('address2' in req.body) updatedUser.address2 = req.body.address2;
  if ('town' in req.body) updatedUser.town = req.body.town;
  if ('country' in req.body) updatedUser.country = req.body.country;
  if ('postcode' in req.body) updatedUser.postcode = req.body.postcode;
  if ('active' in req.body) nupdatedUser.active = req.body.active;
  if ('role' in req.body) updatedUser.role = req.body.role;
  if ('telephone' in req.body) updatedUser.telephone = req.body.telephone;
  console.log(req.body);
  if (req.decoded.role === 'admin' && req.query.userID) {
    try {
      console.log(`updating user ID: ${req.query.userID} for admin use`);
      result = await UserModel.findByIdAndUpdate(req.decoded.id, updatedUser);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      return res.status(200).json({status: 'error', msg: 'failed to update user'});
    }
  } else {
    try {
      console.log(`updating user ID: ${req.decoded.id} for end user`);
      result = await UserModel.findByIdAndUpdate(req.decoded.id, updatedUser);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      return res.status(200).json({status: 'error', msg: 'failed to update user'});
    }
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserModel.find();
    return res.status(200).json(result);
  } catch (error) {
    console.error(err.message);
    return res.status(400).json({status: 'error', msg: 'failed to retrieve all users'});
  }
};

module.exports = {seedUser, getUser, getAllUser, updateUser, seedOrder};
const countUsersByRole = async (req, res) => {
  const {role} = req.query; // Assume role is passed as a query parameter, e.g., /api/users/count?role=user

  try {
    // Count documents where the role matches the query parameter
    const count = await UserModel.countDocuments({role: 'contributor'});
    return res.status(200).json({
      status: 'success',
      role: role,
      count: count,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: 'error',
      msg: `Failed to retrieve count for role: ${role}`,
    });
  }
};

module.exports = {
  seedUser,
  getUser,
  getAllUser,
  updateUser,
  countUsersByRole,
};
