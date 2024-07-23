const { Contact, Application } = require("../src/models");

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Contact.sync({ force: true });
  await Application.sync({ force: true });
  //insert data
  await Promise.all([
    Contact.create({
      id: 1,
      firstName: "Roky",
      lastName: "Robot",
      email: "textjob2@gmail.com",
      phone: "+31067856735",
      city: "Paris",
      motivation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      cv: "VGhpcyBpcyBhIHNhbXBsZSB0ZXh0IGZpbGUu",
    }),
    Contact.create({
      id: 2,
      firstName: "Michael",
      lastName: "Robot",
      email: "textjob@gmail.com",
      phone: "+31067856732",
      city: "Armstardan",
      motivation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      cv: "VGhpcyBpcyBhIHNhbXBsZSB0ZXh0IGZpbGUu",
    }),
    Application.create({
      jobId: "108203183",
      contactId: 1,
      contact: 2,
      timestamp: 1625235476000000,
    }),
    Application.create({
      jobId: 108203185,
      contactId: 2,
      contact: 2,
      timestamp: 1625235476005000,
    }),
  ]);
}
