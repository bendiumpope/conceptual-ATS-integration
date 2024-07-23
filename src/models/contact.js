const { Model, DataTypes } = require("sequelize");
const sequelize = require("../model");

class Contact extends Model {}

Contact.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Contact",
  }
);

module.exports = Contact;
