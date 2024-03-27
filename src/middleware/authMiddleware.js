const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  if (!('authorization' in req.headers)) {
    return res.status(400).json({
      status: 'error',
      msg: 'No token found',
    });
  }

  const token = req.headers['authorization'].replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET); //decode the token
      req.decoded = decoded; //update the req object with the decoded value (
      next(); //pass the control to the next item
    } catch (err) {
      return res.status(403).json({status: 'error', msg: 'missing token'});
    }
  }
};

exports.module = auth;
