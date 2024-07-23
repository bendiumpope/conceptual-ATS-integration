const { Model, DataTypes } = require("sequelize");
const sequelize = require("../model");

class Application extends Model {}

Application.init(
  {
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Application",
  }
);

module.exports = Application;
