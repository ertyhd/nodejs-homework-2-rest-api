const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test /api/auth/register route", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe("POST /api/auth/login", () => {
    const loginData = {
      email: "qwerty@uk.co",
      password: "123456",
    };

    let response;

    beforeAll(async () => {
      response = await request(app).post("/api/auth/login").send(loginData);
    });

    test("should return status code 200", () => {
      expect(response.statusCode).toBe(200);
    });

    test("should return user email", () => {
      expect(response.body.user.email).toBe(loginData.email);
    });

    test("should return token from the user", async () => {
      const user = await User.findOne({ email: loginData.email });
      expect(response.body.token).toBe(user.token);
    });

    test("should return user email and subscription from the database", async () => {
      const user = await User.findOne({ email: loginData.email });
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.subscription).toBe(user.subscription);
    });

    test("should return email and subscription as strings", async () => {
      const user = await User.findOne({ email: loginData.email });
      expect(typeof response.body.user.email).toBe("string");
      expect(typeof response.body.user.subscription).toBe("string");
    });
  });
});
