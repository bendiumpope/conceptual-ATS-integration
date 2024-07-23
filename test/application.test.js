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

  it("should create an application and return success", async () => {
    const applicationData = {
      jobId: "1",
      contactId: 1,
    };

    model.Application.create.mockImplementationOnce(() =>
      Promise.resolve({
        message: "success",
      })
    );

    const res = await request(app)
      .post("/api/v1/ats/applications")
      .send(applicationData)
      .expect(200);

    expect(res.body).toHaveProperty("message", "success");
    expect(model.Application.create).toHaveBeenCalled();
  });

  it("should return a validation error if required fields are missing", async () => {
    const incompleteApplicationData = {
      jobId: "1",
    };

    const res = await request(app)
      .post("/api/v1/ats/applications")
      .send(incompleteApplicationData)
      .expect(404);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("missing required field");
  });
  it("should return a validation error if required fields type is invalid", async () => {
    const incompleteApplicationData = {
      jobId: 1,
      contactId: 1,
    };

    const res = await request(app)
      .post("/api/v1/ats/applications")
      .send(incompleteApplicationData)
      .expect(400);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("invalid payload type");
  });
});
