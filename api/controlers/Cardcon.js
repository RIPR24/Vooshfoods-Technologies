const Cardmodel = require("../Models/Cardmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
  token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.ACCESS_SECRET, (err, uid) => {
      if (err) {
        res.json({ status: "unauthorised access" });
      } else {
        req.uid = uid;
        next();
      }
    });
  } else {
    res.json({ status: "unauthorised access" });
  }
};

const getUserCards = async (req, res) => {
  const cards = await Cardmodel.find({ userid: req.uid });
  res.json({ status: "success", cards });
};

const addNewCard = async (req, res) => {
  const data = req.body;
  date = new Date();
  const crd = { ...data, created: date.toString() };
  const card = await Cardmodel.create(crd);
  const cards = await Cardmodel.find({ userid: req.uid });
  res.json({ status: "success", cards });
};

const modifyCard = async (req, res) => {
  const data = req.body;
  const card = await Cardmodel.findById(data._id);
  if (data.title) {
    card.title = data.title;
  }
  if (data.description) {
    card.description = data.description;
  }
  if (data.due) {
    card.due = data.due;
  }
  if (data.type) {
    card.type = data.type;
  }
  await card.save();
  const cards = await Cardmodel.find({ userid: req.uid });
  res.json({ status: "success", cards });
};

const deleteCard = async (req, res) => {
  const data = req.body;
  const result = await Cardmodel.findByIdAndDelete(data._id);
  const cards = await Cardmodel.find({ userid: req.uid });
  res.json({ status: "success", cards });
};

module.exports = {
  getUserCards,
  addNewCard,
  modifyCard,
  deleteCard,
  Auth,
};
