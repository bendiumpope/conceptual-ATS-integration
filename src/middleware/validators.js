const contactValidator = (req, res, next) => {
  const { firstName, lastName, email, phone, city, motivation, cv } = req.body;
  const invalidPayload =
    !firstName || !lastName || !email || !phone || !city || !motivation || !cv;

  const invalidPayloadType =
    typeof firstName != "string" ||
    typeof lastName != "string" ||
    typeof phone != "string" ||
    typeof email != "string" ||
    typeof city != "string" ||
    typeof motivation != "string" ||
    typeof cv != "string";

  if (invalidPayload) {
    res.status(404).send({ status: "fail", message: "invalid payload" });
  }

  if (invalidPayloadType) {
    res.status(404).send({ status: "fail", message: "invalid payload type" });
  }

  next();
};

const applicationValidator = (req, res, next) => {
  const { jobId, contactId } = req.body;
  const invalidPayload = !jobId || !contactId;

  const invalidPayloadType =
    typeof jobId != "string" || typeof contactId != "number";

  if (invalidPayload) {
    return res
      .status(404)
      .send({ status: "fail", message: "Application= invalid payload" });
  }

  if (invalidPayloadType) {
    return res
      .status(404)
      .send({ status: "fail", message: "Application= invalid payload type" });
  }

  next();
};

const externalATSValidator = (req, res, next) => {
  const { jobid, name, email, phone, city, motivation } = req.body;
  const invalidPayload =
    !jobid || !name || !email || !phone || !city || !motivation;

  const invalidPayloadType =
    typeof jobid != "string" ||
    typeof name != "string" ||
    typeof phone != "string" ||
    typeof email != "string" ||
    typeof city != "string" ||
    typeof motivation != "string";

  if (invalidPayload) {
    res.status(404).send({ status: "fail", message: "invalid payload" });
  }

  if (invalidPayloadType) {
    res.status(404).send({ status: "fail", message: "invalid payload type" });
  }

  next();
};

module.exports = {
  contactValidator,
  applicationValidator,
  externalATSValidator,
};
