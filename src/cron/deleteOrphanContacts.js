const cron = require("node-cron");
const { Contact, Application, sequelize } = require("../models");
const { Op } = require("sequelize");

// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running cron job to delete orphaned contacts...");

    // Find contacts without related applications
    const orphanedContacts = await Contact.findAll({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(
            `SELECT DISTINCT contactId FROM Applications`
          ),
        },
      },
    });

    // Delete orphaned contacts
    for (const contact of orphanedContacts) {
      await contact.destroy();
    }

    console.log(`Deleted ${orphanedContacts.length} orphaned contacts.`);
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});
