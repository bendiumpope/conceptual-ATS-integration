const { Contact } = require("../models");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

function formatPhoneNumber(phone) {
  const phoneNumber = parsePhoneNumberFromString(phone, "NL"); // Assuming default country is Netherlands
  if (phoneNumber) {
    return phoneNumber.formatInternational();
  } else {
    return "";
  }
}

const createContact = async (req, res) => {
  const payload = req.body;
  const { firstName, lastName, email, city, cv, motivation } = payload;
  const phone = formatPhoneNumber(payload.phone);

  if (!phone) {
    return res
      .status(400)
      .send({ status: "fail", message: "Invalid phone number" });
  }
  const contactData = {
    firstName,
    lastName,
    email,
    phone,
    city,
    motivation,
    cv,
  };

  const { dataValues } = await Contact.create(contactData);

  res.status(200).send({ status: "success", contactId: dataValues.id });
};

module.exports = {
  createContact,
};
