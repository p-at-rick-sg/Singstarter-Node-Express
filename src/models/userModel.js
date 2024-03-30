const mongoose = require('mongoose');

//set the arrays for schema validation here
const roleEnum = ['user', 'contributor', 'admin'];
const countryEnum = ['singapore', 'malaysia'];

const UserSchema = new mongoose.Schema(
  {
    email: {type: String, require: true},
    passwordHash: {type: String, require: true},
    firstName: {type: String, require: true, min: 2, max: 15},
    lastName: {type: String, require: true, min: 2, max: 15},
    role: {type: String, enum: roleEnum, require: true, default: roleEnum[0]},
    createdDate: {type: Date, default: Date.now},
    active: {type: Boolean, default: true},
    address1: {type: String, required: true, min: 5, max: 100},
    address2: {type: String, required: false, min: 5, max: 100},
    town: {type: String, required: true, min: 4, max: 40},
    country: {type: String, required: true, def: countryEnum[0]},
    postcode: {type: String, required: true},
    telephone: {type: String, required: false},
    company: {type: String, required: false, min: 1, max: 40},
  },
  {collection: 'users'}
);

module.exports = mongoose.model('User', UserSchema);
