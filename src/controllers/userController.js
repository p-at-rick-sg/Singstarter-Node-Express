const getUsers = async (req, res) => {
  console.log('get users endpoint');
    // need to redefine the logic to get the users below since moving it to the new file
  // const allUsers = await Auth.find();
  res.json(allusers);
};

module.exports = {getUsers};
