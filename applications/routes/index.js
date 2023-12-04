const express = require("express");
const router = express.Router();
const {
  createApplication,
  getAllApplication,
  getApplication,
} = require("../middlewares/applications.middleware");

router.get("/test", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Testing successfull",
  });
});

router.post("/applications/create", createApplication);
router.get("/applications", getAllApplication);
router.get("/applications/:id?", getApplication);

module.exports = router;
