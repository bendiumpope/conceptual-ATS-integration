const axios = require("axios");

function formatPhoneNumber(phone) {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "+31" + cleaned.slice(1);
  } else if (!cleaned.startsWith("+31")) {
    cleaned = "+31" + cleaned;
  }
  return cleaned;
}

const createExternalATS = async (req, res) => {
  try {
    const payload = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const [firstName, lastName] = payload.name.split(" ");
    const phone = formatPhoneNumber(payload.phone);
    console.log(JSON.stringify(file));
    const contactPayload = {
      firstName,
      lastName,
      email: payload.email,
      phone,
      city: payload.city,
      motivation: payload.motivation,
      cv: JSON.stringify(file),
    };

    const { data } = await axios.post(
      "http://localhost:3001/api/v1/ats/contacts",
      contactPayload
    );

    if (data.status === "fail") {
      return res.status(500).send({ message: "fail", message: data.message });
    }

    const contactId = data.contactId;

    const applicationPayload = {
      jobId: payload.jobid,
      contactId,
    };

    await axios.post(
      "http://localhost:3001/api/v1/ats/applications",
      applicationPayload
    );

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "fail", message: error.message });
  }
};

module.exports = {
  createExternalATS,
};
