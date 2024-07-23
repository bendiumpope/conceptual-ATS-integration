const sequelize = require("../model");
const Contact = require("./contact");
const Application = require("./application");

// Contact.hasMany(Application, { as: "Contact", foreignKey: "ContactId" });
// Application.belongsTo(Contact, { as: "Contact" });

module.exports = {
  sequelize,
  Contact,
  Application,
};
