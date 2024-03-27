const getUsers = async (req, res) => {
  console.log('get users endpoint');
  // const allUsers = await Auth.find();
  res.json(allusers);
};

module.exports = {getUsers};
