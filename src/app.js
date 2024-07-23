const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const {
  contactRoutes,
  applicationRoutes,
  atsExternalIntegrationRoutes,
} = require("./routes");
const limiter = require("./middleware/rateLimiter");
const { sequelize, Contact, Application } = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/api/v1", limiter);

app.set("sequelize", sequelize);
app.set("models", { Contact, Application });

app.use(cors());

app.use("/api/v1/ats/apply", atsExternalIntegrationRoutes);
app.use("/api/v1/ats/contacts", contactRoutes);
app.use("/api/v1/ats/applications", applicationRoutes);

module.exports = app;
