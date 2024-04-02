const mongoose = require('mongoose');

//set the arrays for schema validation here

//setup the sub-schemas here
const ImagesSchema = new mongoose.Schema({
  URL: {type: String},
  description: {type: String},
});

const QAndASchema = new mongoose.Schema({
  question: {type: String, min: 20, max: 3600},
  answer: {type: String, min: 20, max: 360, default: null},
});

// Need to add orders to the project document later

const ProjectSchema = new mongoose.Schema(
  {
    title: {type: String, required: true, min: 10, max: 30},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    images: [{type: ImagesSchema}],
    qAndA: [{type: QAndASchema}],
    target: {type: Number, required: true, min: 100, max: 10000},
    currentTotal: {type: Number, required: true, default: 0},
    createdDate: {type: Date, required: true, default: Date.now()},
    endDate: {
      type: Date,
      requred: true,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 90);
        return date;
      },
      min: Date.now(),
    },
  },
  {collection: 'projects'}
);

module.exports = mongoose.model('Projects', ProjectSchema);
