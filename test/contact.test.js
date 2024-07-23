const request = require("supertest");
const app = require("../src/app");
const model = require("../src/models");

jest.mock("../src/models");

describe("POST /api/v1/ats/contacts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should create a contact and return success with contactId", async () => {
    const contactData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+31 6 12345678",
      city: "Amsterdam",
      motivation: "Looking for a new challenge",
      cv: "Base64EncodedCVString",
    };

    model.Contact.create.mockImplementationOnce(() =>
      Promise.resolve({ dataValues: { id: 1 } })
    );

    const res = await request(app)
      .post("/api/v1/ats/contacts")
      .send(contactData)
      .expect(200);

    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("contactId", 1);
    expect(model.Contact.create).toHaveBeenCalledWith(contactData);
  });

  it("should return an error if phone number is invalid", async () => {
    const invalidContactData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "invalidPhone",
      city: "Amsterdam",
      motivation: "Looking for a new challenge",
      cv: "Base64EncodedCVString",
    };

    const res = await request(app)
      .post("/api/v1/ats/contacts")
      .send(invalidContactData)
      .expect(400);

    expect(res.body).toHaveProperty("message", "Invalid phone number");
  });

  it("should return a validation error if required fields are missing", async () => {
    const incompleteContactData = {
      firstName: "John",
      lastName: "Doe",
      phone: "+31612345678",
    };

    const res = await request(app)
      .post("/api/v1/ats/contacts")
      .send(incompleteContactData)
      .expect(404);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("missing required fields");
  });
});
