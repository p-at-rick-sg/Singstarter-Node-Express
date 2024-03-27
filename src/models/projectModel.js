const mongoose = require('mongoose');

//set the arrays for schema validation here

const ProjectSchema = new mongoose.Schema(
  {
    projectTitle: {type: String, require: true, min: 10, max: 30},
    owner: {type: Schema.Types.ObjectId, require: true},
    // add additional fields are required here
  },
  {collection: projects}
);

module.exports = mongoose.model('Projects', ProjectSchema);
