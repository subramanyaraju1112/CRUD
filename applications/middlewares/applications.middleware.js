const e = require("express");
const db = require("../models/index");
const application = db.application;

const createApplication = (req, res) => {
  try {
    const { name, email, gender, mobile, address } = req.body;

    application.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(500).send({
          success: false,
          message: "Email already exists",
        });
      } else {
        const newApplication = new application({
          name,
          email,
          gender,
          mobile,
          address,
          time: Date.now(),
        });

        newApplication
          .save()
          .then((createdApplication) => {
            if (createdApplication) {
              res.status(200).send({
                success: true,
                message: "New application created successfully",
              });
            } else {
              res.status(500).send({
                success: false,
                message: "Something went wrong",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message: "Unable to create application",
              err,
            });
          });
      }
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Please provide all the details",
    });
  }
};

const getAllApplication = (req, res) => {
  application
    .find({})
    .then((applications) => {
      if (applications) {
        res.status(200).send({
          success: true,
          message: "All applications fetched successfully",
          applications,
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        err,
      });
    });
};

const getApplication = (req, res) => {
  application.findOne({ _id: req.params.id }).then((application) => {
    if (application) {
      res.status(200).send({
        success: true,
        message: "Application fetched successfully",
        application,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    }
  });
};

module.exports = {
  createApplication,
  getAllApplication,
  getApplication,
};
