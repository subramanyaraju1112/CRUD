const mongoose = require("mongoose");

const applicationsSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  mobile: {
    type: Number,
    default: "",
  },
  time: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

const application = mongoose.model("applications", applicationsSchema);

module.exports = application;
