const cron = require("node-cron");
const fs = require("fs").promises;
const { Op } = require("sequelize");
const { Contact, Application, sequelize } = require("../models");

// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * 0", async () => {
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
      const cv = JSON.parse(contact.cv);
      const filePath = cv.path;

      // Delete the file if it exists
      if (filePath) {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
      await contact.destroy();
    }

    console.log(`Deleted ${orphanedContacts.length} orphaned contacts.`);
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});
