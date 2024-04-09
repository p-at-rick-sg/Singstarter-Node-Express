require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const { ProjectModel, OrderModel } = require("../models/projectModel");
const { UserModel } = require("../models/userModel");
const fs = require("fs").promises;
const path = require("path");
const { ObjectId } = require("mongodb");

const seedProject = async (req, res) => {
  try {
    await ProjectModel.deleteMany({});
    await ProjectModel.create([
      {
        _id: "6700ddf51fd1162aae22ea20",
        owner: "670012312fd1162aae22ff30",
        title: "My cool new project",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quidem quasi harum doloremque iusto quisquam repudiandae incidunt minima provident, magnam fugit unde aspernatur facilis alias. Voluptates nostrum distinctio nobis inventore!",
        images: [
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/600x400.jpg",
            description: "placeholder 600x300",
          },
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/300x200.jpg",
            description: "placeholder 300x200",
          },
        ],
        qAndA: [
          {
            question: "How many legs does a spider have in the morning?",
            answer:
              "& as one grows during their lunch break and falls off at night whjen they sleep!",
          },
          { question: "A second question with no answer yet" },
        ],
        target: 5000,
        currentTotal: 550,
      },
      {
        _id: "6700ddf51fd1162aae22ea26",
        owner: "6607d0de21420541915eebdb",
        title: "Second Cool Project",
        description: "Support my SingStarter here!!",
        images: [
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/600x400.jpg",
            description: "placeholder 600x300",
          },
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/300x200.jpg",
            description: "placeholder 300x200",
          },
        ],
        qAndA: [
          {
            question: "How many legs does a spider have in the morning?",
            answer:
              "& as one grows during their lunch break and falls off at night whjen they sleep!",
          },
          { question: "A second question with no answer yet" },
        ],
        target: 5000,
        currentTotal: 550,
        createdDate: "2024-01-23T17:12:39.141Z",
      },

      {
        _id: "6700ddf51fd1162aae22ea29",
        owner: "670012312fd1162aae22ff30",
        title: "Third Awesome Project! ",
        description: "Please Fund my project, this is the third project",
        images: [
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/e8af3341ff805d45578198716e7ac89a.jpg",
            description: "placeholder 600x300",
          },
          {
            URL: "https://storage.googleapis.com/ga-project-3-assets/300x200.jpg",
            description: "placeholder 300x200",
          },
        ],
        qAndA: [
          {
            question: "How many legs does a spider have in the morning?",
            answer:
              "& as one grows during their lunch break and falls off at night whjen they sleep!",
          },
          { question: "A second question with no answer yet" },
        ],
        target: 5000,
        currentTotal: 550,
        createdDate: "2024-02-16T17:12:39.141Z",
      },
    ]);
    return res
      .status(200)
      .json({ status: "ok", msg: "project seeding successful" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json({ status: "error", msg: "project seeding failed" });
  }
};

const getProjects = async (req, res) => {
  if (req.query.projectID) {
    console.log(`fetching project id: ${req.query.projectID}`);
    result = await ProjectModel.find({ _id: req.query.projectID });
    return res.status(200).json(result);
  } else {
    try {
      const allProjects = await ProjectModel.find();
      return res.status(200).json(allProjects);
    } catch (err) {
      console.error(err.message);
      return res
        .status(200)
        .json({ status: "error", msg: "failed to retrieve projectss" });
    }
  }
};

const getMyProjects = async (req, res) => {
  try {
    console.log(req.decoded.id);
    // String(req.decoded.id);
    // const ownerId = new ObjectId(req.decoded.id);
    console.log(req.decoded.id);
    const result = await ProjectModel.find({ owner: req.decoded.id });
    console.log("your projects ", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to get contributors projects" });
  }
};

const getQA = async (req, res) => {
  try {
    const result = await ProjectModel.findById(req.params.projectID);
    res.status(200).json(result.qAndA);
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to get contributors projects" });
  }
};

const getProjectPictures = async (req, res) => {
  try {
    const result = await ProjectModel.findById(req.params.projectID);
    res.status(200).json(result.images);
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to get project pictures" });
  }
};

const getOrders = async (req, res) => {
  const testObj = new ObjectId(req.query.projectID);
  if (ObjectId.isValid(testObj)) {
    try {
      const result = await OrderModel.find({ projectID: req.query.projectID });
      // set the user email into the object
      console.log(result);
      const orders = await Promise.all(
        result.map(async (order) => {
          const user = await UserModel.findById(order.userID);
          console.log(user);
          return { ...order, customerEmail: user.email };
        })
      );

      return res.status(200).json(orders);
    } catch (err) {
      console.error("Error: ", err);
      return res
        .status(400)
        .json({ status: "error", msg: "failed to fetch orders" });
    }
  }
};

const updateQ = async (req, res) => {
  try {
    const result = await ProjectModel.findByIdAndUpdate(
      req.params.projectID,
      { $push: { qAndA: { question: req.body.question } } },
      { new: true }
    );
    const newQuestionId = result.qAndA[result.qAndA.length - 1].id;
    return res
      .status(200)
      .json({ status: "ok", msg: "added question", id: newQuestionId });
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to add question" });
  }
};

const updateA = async (req, res) => {
  try {
    const objID = new ObjectId(req.params.questionID);
    const test = await ProjectModel.find({ "qAndA._id": objID });
    if (test.length !== 1) {
      console.log(test.length);
      console.error("questionID not unique");
      return res
        .status(400)
        .json({ status: "error", msg: "questionID is not unique" });
    }
    const test2 = await ProjectModel.find(
      { "qAndA._id": objID },
      { new: true }
    );

    const result = await ProjectModel.findOneAndUpdate(
      { "qAndA._id": objID },
      { $set: { "qAndA.$.answer": req.body.answer } },
      { new: true }
    );
    return res.status(200).json({ status: "ok", msg: "added answer" });
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to add answer" });
  }
};

const uploadToGCP = async (file, fileOutputName) => {
  try {
    const storage = new Storage();
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const result = await bucket.upload(file, {
      destination: fileOutputName,
    });
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

const deleteFile = async (filePath) => {
  try {
    result = await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const uploadAsset = async (req, res) => {
  try {
    const fileSuffix = req.file.originalname.split(".").pop();
    const fileName = req.file.filename + "." + fileSuffix;
    console.log("here is the desc emelemnt: ", req.file);
    const fileDescription =
      req.file.imageDescription || "Default Image Description";
    const result = await uploadToGCP(req.file.path, fileName);
    if (result[0].id) {
      //compose the full url
      const imageURI = process.env.IMAGE_BASE_URI + result[0].id;
      //remove the image from the local storage
      const filePath = path.resolve("uploads/", req.file.filename);
      deleteFile(filePath);
      //add the URL to the project model (need tp pull the project ID - add manually for testing)
      dbResult = await ProjectModel.findByIdAndUpdate(req.params.projectID, {
        $push: { images: { URL: imageURI, description: fileDescription } }, //need to add the desc from body
      });
      console.log(dbResult);
      //return the URL path for the caller
      return res.status(200).json({
        status: "ok",
        msg: "file upload successful",
        fileURL: imageURI,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "file upload failed" });
    }
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "file upload failed with error" });
  }
};

const addProject = async (req, res) => {
  try {
    const idObj = new ObjectId(req.decoded.id);
    newProject = {};
    newProject.owner = idObj;
    newProject.title = req.body.title;
    newProject.description = req.body.description;
    newProject.target = req.body.target;
    newProject.productCost = req.body.productCost;
    if ("endDate" in req.body) newProject.endDate = req.body.endDate;
    const result = await ProjectModel.create(newProject);
    console.log(result);
    return res.status(200).json({
      status: "ok",
      msg: "successfully added project",
      id: result._id,
    });
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "failed to add project" });
  }
};

const countNumProject = async (req, res) => {
  try {
    const count = await ProjectModel.countDocuments();
    return res.status(200).json({
      status: "success",
      count: count,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "Error",
      msg: " Failed to count Num of Project",
    });
  }
};

const getProjectsBySearchTerm = async (req, res) => {
  // Extract the search term from the query parameter
  const searchTerm = req.query.term;

  try {
    // Use a regex to search for the term in the title field of the projects
    // 'i' option makes it case-insensitive
    const regex = new RegExp(searchTerm, "i");
    const result = await ProjectModel.find({ title: { $regex: regex } });

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "error",
      msg: "Server error during the search operation.",
    });
  }
};

module.exports = {
  seedProject,
  uploadAsset,
  getProjects,
  addProject,
  getMyProjects,
  getQA,
  getProjectPictures,
  updateQ,
  updateA,
  getOrders,
  countNumProject,
  getProjectsBySearchTerm,
};
