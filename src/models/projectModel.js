const mongoose = require("mongoose");

//set the arrays for schema validation here
const currencyEnum = ["sgd", "usd", "myr"];
//setup the sub-schemas here
const ImagesSchema = new mongoose.Schema({
  URL: { type: String },
  description: { type: String },
});

const QAndASchema = new mongoose.Schema({
  question: { type: String, minLength: 20, maxLength: 3600 },
  answer: { type: String, minLength: 20, maxLength: 360, default: null },
});

// Need to add orders to the project mopdel later

const ProjectSchema = new mongoose.Schema(
  {
<<<<<<< Updated upstream
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true, minLength: 10, maxLength: 40 },
    description: { type: String, required: true },
    images: [{ type: ImagesSchema }],
    qAndA: [{ type: QAndASchema }],
    target: { type: Number, required: true, min: 100, max: 10000 },
    currentTotal: { type: Number, required: true, default: 0 },
    productCost: { type: Number, required: false, min: 50, max: 500 },
    currency: { type: String, enum: currencyEnum, required: false },
    createdDate: { type: Date, required: true, default: Date.now() },
=======
    owner: {type: mongoose.Schema.Types.ObjectId, required: true},
    title: {type: String, required: true, minLength: 10, maxLength: 40},
    description: {type: String, required: true},
    images: [{type: ImagesSchema}],
    qAndA: [{type: QAndASchema}],
    target: {type: Number, required: true, min: 100, max: 10000},
    currentTotal: {type: Number, required: true, default: 0},
    productCost: {type: Number, required: false, min: 10, max: 500},
    currency: {type: String, enum: currencyEnum, required: false},
    createdDate: {type: Date, required: true, default: Date.now()},
>>>>>>> Stashed changes
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
  { collection: "projects" }
);

const OrderSchema = new mongoose.Schema(
  {
<<<<<<< Updated upstream
    projectID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    totalValue: { type: Number, required: true, min: 10, max: 500 },
    paymentID: { type: String, required: true, minLength: 17, maxLength: 27 },
    createdDate: { type: Date, required: true, default: Date.now() }, //pi_3P0bdFLxC0YAsxAS0PiWmldC
=======
    projectID: {type: mongoose.Schema.Types.ObjectId, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, required: true},
    totalValue: {type: Number, required: true, min: 10, max: 500},
    paymentID: {type: String, required: true, minLength: 17, maxLength: 27},
    createdDate: {type: Date, required: true, default: Date.now()}, //pi_3P0bdFLxC0YAsxAS0PiWmldC
    address1: {type: String, required: true, min: 5, max: 100},
    address2: {type: String, required: false, min: 5, max: 100},
    town: {type: String, required: true, min: 4, max: 40},
    country: {type: String, required: true},
    postcode: {type: String, required: true},
    telephone: {type: String, required: false},
>>>>>>> Stashed changes
  },
  { collection: "orders" }
);

const ProjectModel = mongoose.model("Projects", ProjectSchema);
const OrderModel = mongoose.model("Orders", OrderSchema);
module.exports = { ProjectModel, OrderModel };
// module.exports = mongoose.model('Projects', ProjectSchema);
