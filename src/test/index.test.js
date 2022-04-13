const request = require("supertest");
const app = require("../../app");

const mongoose = require("mongoose");
const librarian = {
   email: "asdasd@gmail.com",
   password: "asdasd1",
};
const librarianToken =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ2NjdjMjMyYWI4OGYyYTQxMmM1NGQiLCJpYXQiOjE2NDkzMTE4NTR9.gDUtASurjCTlvg7-3y2dy8a-Xo3GiDKQgYeybRLGSh8";
const memberToken =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ2YjcwYjI0ODk3YzNmOGUyMjllODAiLCJpYXQiOjE2NDkyMzQzMzZ9.V8uELcefWTpKuVuAki_sHN9AMMtU9ZnmGQrQxZypyzk";
const invalidToken = "";

describe("Should login for a user", () => {
   // afterAll(async () => {
   //   await mongoose.connection.close();
   // });
   test("should return status 200 when email and password is true", async () => {
      const res = await request(app).post("/api/signin").send({
         email: librarian.email,
         password: librarian.password,
      });
      // const librarianToken = res._body.token;
      // console.log(librarianToken);

      expect(res.statusCode).toBe(200);
      //   expect(res.body.message).toBe("Login Successfully");
   });

   test("should return status 401 when email is false", async () => {
      const res = await request(app).post("/api/signin").send({
         email: "zxczxc@gmail.com",
         password: "asdasd1",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe(
         "User with that email does not exist. Please become a member"
      );
   });

   test("should return status 401 when password is false", async () => {
      const res = await request(app).post("/api/signin").send({
         email: "huuthien@gmail.com",
         password: "1231234",
      });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe("Account information invalid");
   });
});
describe("Should add member by admin", () => {
   // afterAll(async () => {
   //   await mongoose.connection.close();
   // });

   test("should return status 403 when invalid token", async () => {
      const res = await request(app)
         .post("/api/signup")
         .send({
            name: "unittest",
            email: "unittest@gmail.com",
            password: "asdasd1",
         })
         .set("authorization", invalidToken);
      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe(
         "Unauthorized access! Please sign in to the respective account"
      );
   });
   test("should return status 403 when not allowed", async () => {
      const res = await request(app)
         .post("/api/signup")
         .send({
            name: "unittest",
            email: "unittest@gmail.com",
            password: "asdasd1",
         })
         .set("authorization", memberToken);

      expect(res.body.error).toBe("Invalid token!");
      expect(res.statusCode).toBe(403);
   });
});