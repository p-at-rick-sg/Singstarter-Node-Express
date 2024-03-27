const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

const signup = async (req, res) => {
  try {
    const auth = await Auth.findOne({username: req.body.username});
    if (auth) {
      return res
        .status(400)
        .json({status: 'error', msg: 'duplicate username/user already registered'}); //returns is username already in db
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await Auth.create({
      username: req.body.username,
      hash,
    });
    res.status(200).json({status: 'ok', msg: 'user registered successfully'});
  } catch (err) {
    console.log(err.message);
    res.status(400).json({status: 'error', msg: 'failed registration'});
  }
};

const signin = async (req, res) => {
  try {
    const auth = await Auth.findOne({username: req.body.username});
    if (!auth) {
      return res.status(400).json({status: 'error', msg: 'not authorized'}); //this is the invalid username return
    }
    const result = await bcrypt.compare(req.body.password, auth.hash); //compare the password hash against stored hash
    console.log(result);
    if (!result) {
      console.log('incorrect username');
      return res.status(400).json({status: 'not ok', msg: 'failed login'});
    }
    //if we get here login succeeded so we set up the jwt
    const claims = {
      username: auth.username,
      role: 'test role',
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: '30m',
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: '30d',
      jwtid: uuidv4(),
    });

    res.json({access, refresh}); //shorthnd - would be access: access etc
  } catch (err) {
    console.error('failed login after password check');
    return res.status(400).json({error: err, msg: 'Other failed login error'});
  }
};

module.exports = {signup, signin};
