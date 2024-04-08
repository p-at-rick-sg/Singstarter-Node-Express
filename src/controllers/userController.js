const { ProjectModel, OrderModel } = require("../models/projectModel");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");

const { addDays, subDays, format } = require("date-fns");

const seedUser = async (req, res) => {
  console.log("seeding users");
  try {
    console.log("creatingpasswords");
    const passwordHash1 = await bcrypt.hash("password", 12);
    const passwordHash2 = await bcrypt.hash("password", 12);
    const passwordHash3 = await bcrypt.hash("password", 12);
    await UserModel.deleteMany({});
    await UserModel.create([
      // {
      //   _id: '5589645fgdd1162aae22ee21',
      //   email: 'user@test.com',
      //   passwordHash: passwordHash1,
      //   firstName: 'UserFirst',
      //   lastName: 'UserLast',
      //   address1: '21 Some street',
      //   town: 'Bugis',
      //   country: 'singapore',
      //   postcode: '123456',
      //   role: 'user',
      // },
      {
        _id: "550012312fd1162aae22ff30",
        email: "contributor@test.com",
        passwordHash: passwordHash2,
        firstName: "ContribFirst",
        lastName: "ContribLast",
        address1: "21 Some street",
        town: "Punggol",
        country: "singapore",
        postcode: "789789",
        role: "contributor",
        company: "Awesome Company",
      },
      // {
      //   _id: '5550de645645df162aae22ff32',
      //   email: 'contributor2@test.com',
      //   passwordHash: passwordHash2,
      //   firstName: 'ContributeSecond',
      //   lastName: 'ContribLast',
      //   address1: 'somwhere',
      //   town: 'Bedok',
      //   country: 'singapore',
      //   postcode: '545334',
      //   role: 'contributor',
      //   company: 'The Good Company',
      // },
      // {
      //   _id: '990d123gdfgdg2aae22ff55',
      //   email: 'admin@test.com',
      //   passwordHash: passwordHash3,
      //   firstName: 'AdminFirst',
      //   lastName: 'AdminLast',
      //   address1: 'The best Street',
      //   address2: 'in the best tower block complex',
      //   town: 'Sentosa',
      //   country: 'singapore',
      //   postcode: '996699',
      //   role: 'admin',
      // },
    ]);
    return res
      .status(200)
      .json({ status: "ok", msg: "user seeding successful" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json({ status: "error", msg: "user seeding failed" });
  }
};

const seedManyUser = async (req, res) => {
  console.log("Seeding users...");
  try {
    const users = [];
    const roles = ["contributor", "user"];
    const currentDate = new Date();

    for (let i = 0; i < Math.floor(Math.random() * 100) + 100; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 365); // Random days up to a year ago
      const createdDate = subDays(currentDate, randomDaysAgo);
      const passwordHash = await bcrypt.hash("password", 12);

      users.push({
        email: `user${i}@test.com`,
        passwordHash: passwordHash,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        address1: `${i} Some Street`,
        town: "Singapore",
        country: "Singapore",
        postcode: "123456",
        role: roles[Math.floor(Math.random() * roles.length)],
        active: Math.random() > 0.5,
        createdDate: format(createdDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"), // Formatted as ISO string
      });
    }

    await UserModel.create(users);
    console.log(`Seeded ${users.length} users.`);
    return res
      .status(200)
      .json({ status: "ok", msg: `${users.length} users seeded successfully` });
  } catch (err) {
    console.error("Error seeding users:", err.message);
    return res
      .status(400)
      .json({ status: "error", msg: "User seeding failed" });
  }
};

const seedOrder = async (req, res) => {
  console.log("Seeding orders");
  try {
    await OrderModel.deleteMany({});
    await OrderModel.create([
      {
        projectID: "6700ddf51fd1162aae22ea20",
        userID: "6700de6b1fd1162aae22ee20",
        totalValue: 100,
        paymentID: "pi_3P0bdFLxC0YAsxAS0PiWmldC",
      },
    ]);
    return res.status(200).json({ status: "ok", msg: "seeded an order" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json({ status: "error", msg: "user seeding failed" });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.decoded.id);
    res.status(200).json(result);
  } catch (err) {
    console.error("failed to get user details");
    return res
      .status(400)
      .json({ error: err, msg: "cannot retieve user details" });
  }
};

const updateUser = async (req, res) => {
  const updatedUser = {};
  if ("firstName" in req.body) updatedUser.firstName = req.body.firstName;
  if ("lastName" in req.body) updatedUser.lasstName = req.body.lastName;
  if ("address1" in req.body) updatedUser.address1 = req.body.address1;
  if ("address2" in req.body) updatedUser.address2 = req.body.address2;
  if ("town" in req.body) updatedUser.town = req.body.town;
  if ("country" in req.body) updatedUser.country = req.body.country;
  if ("postcode" in req.body) updatedUser.postcode = req.body.postcode;
  if ("active" in req.body) updatedUser.active = req.body.active;
  if ("role" in req.body) updatedUser.role = req.body.role;
  if ("telephone" in req.body) updatedUser.telephone = req.body.telephone;
  console.log(req.body);
  if (req.decoded.role === "admin" && req.query.userID) {
    try {
      console.log(`updating user ID: ${req.query.userID} for admin use`);
      result = await UserModel.findByIdAndUpdate(req.decoded.id, updatedUser);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      return res
        .status(200)
        .json({ status: "error", msg: "failed to update user" });
    }
  } else {
    try {
      console.log(`updating user ID: ${req.decoded.id} for end user`);
      result = await UserModel.findByIdAndUpdate(req.decoded.id, updatedUser);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      return res
        .status(200)
        .json({ status: "error", msg: "failed to update user" });
    }
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserModel.find();
    return res.status(200).json(result);
  } catch (error) {
    console.error(err.message);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to retrieve all users" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to delete user by id" });
  }
};

const updateUserById = async (req, res) => {
  const updatedUser = {};
  if ("firstName" in req.body) updatedUser.firstName = req.body.firstName;
  if ("lastName" in req.body) updatedUser.lastName = req.body.lastName;
  if ("role" in req.body) updatedUser.role = req.body.role;
  if ("active" in req.body) updatedUser.active = req.body.active;
  try {
    const result = await UserModel.findByIdAndUpdate(
      req.params.id,
      updatedUser
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to update user by id" });
  }
};

module.exports = {
  seedUser,
  getUser,
  getAllUser,
  updateUser,
  seedOrder,
  deleteUserById,
  updateUserById,
};
const countUsersByRole = async (req, res) => {
  const { role } = req.query; // Assume role is passed as a query parameter, e.g., /api/users/count?role=user

  try {
    // Count documents where the role matches the query parameter
    const count = await UserModel.countDocuments({ role: "contributor" });
    return res.status(200).json({
      status: "success",
      role: role,
      count: count,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Failed to retrieve count for role: ${role}`,
    });
  }
};

module.exports = {
  seedUser,
  seedManyUser,
  getUser,
  getAllUser,
  updateUser,
  countUsersByRole,
  deleteUserById,
  updateUserById,
};
