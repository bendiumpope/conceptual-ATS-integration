const { Application } = require("../models");

const createApplication = async (req, res) => {
  const { jobId, contactId } = req.body;

  const applicationData = {
    jobId,
    contactId,
    timestamp: Date.now() * 1000,
  };

  await Application.create(applicationData);

  res.status(200).send({
    message: "success",
  });
};

module.exports = {
  createApplication,
};
