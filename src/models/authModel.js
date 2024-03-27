const mongoose = require('mongoose');

//set the arrays for schema validation here
const roleEnum = ['user', 'contributor', 'admin'];

const AuthSchema = new mongoose.Schema(
  {
    username: {type: String, require: true},
    hash: {type: String, require: true},
    firstName: {type: String, require: true, min: 2, max: 15},
    lastName: {type: String, require: true, min: 2, max: 15},
    role: {type: String, enum: roleEnum, require: true},
    createdDate: {type: Date, default: Date.now},
  },
  {collection: 'auth'}
);

module.exports = mongoose.model('Auth', AuthSchema);
