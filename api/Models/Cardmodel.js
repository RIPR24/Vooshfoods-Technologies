const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  due: {
    type: String,
  },
  userid: {
    type: String,
    required: true,
  },
});

const Cardmodel = mongoose.model("Cards", CardSchema);
module.exports = Cardmodel;
