const mongoose = require('mongoose');

//set the arrays for schema validation here
const currencyEnum = ['sgd', 'usd', 'myr'];
//setup the sub-schemas here
const ImagesSchema = new mongoose.Schema({
  URL: {type: String},
  description: {type: String},
});

const QAndASchema = new mongoose.Schema({
  question: {type: String, minLength: 20, maxLength: 3600},
  answer: {type: String, minLength: 20, maxLength: 360, default: null},
});

// Need to add orders to the project mopdel later

const ProjectSchema = new mongoose.Schema(
  {
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true, minLength: 10, maxLength: 40},
    description: {type: String, required: true},
    images: [{type: ImagesSchema}],
    qAndA: [{type: QAndASchema}],
    target: {type: Number, required: true, min: 100, max: 10000},
    currentTotal: {type: Number, required: true, default: 0},
    productCost: {type: Number, required: false, min: 50, max: 500},
    currency: {type: String, enum: currencyEnum, required: false},
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

const OrderSchema = new mongoose.Schema(
  {
    projectID: {type: mongoose.Schema.Types.ObjectId, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    value: {type: mongoose.Schema.Types.ObjectId, required: true},
    paymentID: {type: String, required: true, minLength: 17, maxLength: 17}, //pi_3P0bdFLxC0YAsxAS0PiWmldC
  },
  {collection: 'orders'}
);

const ProjectModel = mongoose.model('Projects', ProjectSchema);
const OrderModel = mongoose.model('Orders', OrderSchema);
module.exports = {ProjectModel, OrderModel};
// module.exports = mongoose.model('Projects', ProjectSchema);
