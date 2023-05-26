const mongoose = require("mongoose");

const request = require("supertest");

const app = require("../server");

const { green,red } = require('colors');


require("dotenv").config();

/* Connecting to the database before each test. */

beforeEach(async () => {

    await mongoose.connect(process.env.MONGO_URI);
  
  });
  
  
  /* Closing database connection after each test. */
  
  afterEach(async () => {
  
    await mongoose.connection.close();
  
  });

// Admin unit testing 
  describe("Admin Authentication", () => {

    it("should get token", async () => {
  
      const token = await request(app).post("/api/admin/authAdmin").send({
  
        userName: process.env._test_USERNAME,
  
        password: process.env._test_PASSWORD,
  
      });

        console.log("----------------TOKEN------------".red.bold);
        console.log(token.body.token.green);


      expect(token.body.token.length).toBeGreaterThan(1);

      expect(token.status).toBe(200);
  
      expect(token.body.userName).toBe(process.env._test_USERNAME);
  
    });
  });

  describe("Admin Wrong Password Authentication", () => {

    it("should get status code 400", async () => {
  
      const token = await request(app).post("/api/admin/authAdmin").send({
  
        userName: process.env._test_USERNAME,
  
        password: process.env._test_WRONG_PASSWORD,
      });

      console.log("---------Token Status--------".green.bold);
      console.log(token.status);

      expect(token.status).toBe(400);
  
      expect(token.body.message).toBe("Incorrect Password ");
  
    });
  });

  describe("POST get all services with correct Authentication and Authorization", () => {

    it("should get all the services", async () => {
  
      const token = await request(app).post("/api/admin/authAdmin").send({
  
        userName: process.env._test_USERNAME,
  
        password: process.env._test_PASSWORD,
  
      });

        console.log("----------------TOKEN------------".red.bold);
        console.log(token.body.token.green);
  
      const response = await request(app)
  
        .post("/api/admin/getAllServices")
  
        .set({
  
           Authorization: `Bearer ${token.body.token}`,
          "Content-Type": "application/json",
  
        });
  
        console.log("----------------RESPONSE STATUS------------".red.bold);
        console.log(response.status);

      expect(response.status).toBe(200);
  
      expect(response.body.services.length).toBeGreaterThan(0);
  
    });
  });

  describe("POST get all the services when Admin authentication wrong password", () => {

    it("restricted to get all the services if wrong password no authorization", async () => {
  
        const token = await request(app).post("/api/admin/authAdmin").send({
    
          userName: process.env._test_USERNAME,
    
          password: process.env._test_WRONG_PASSWORD,
    
        });
  
          console.log("----------------Status------------".red.bold);
          console.log(token.status);
    
        const response = await request(app)
    
          .post("/api/admin/getAllServices")
    
          .set({
    
             Authorization: `Bearer ${token.body.token}`,
            "Content-Type": "application/json",
    
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.status);
          console.log(response.body);
  
        expect(response.status).toBe(401);
    
        expect(response.body.error).toBe("Your're Not authoruized to the access this");
    
      });

  });

  describe("POST get all bookings with Authorization",()=>{

    it("should get all tour bookings", async () => {
  
        const token = await request(app).post("/api/admin/authAdmin").send({
    
          userName: process.env._test_USERNAME,
    
          password: process.env._test_PASSWORD,
    
        });
  
          console.log("----------------Status------------".red.bold);
          console.log(token.status);
    
        const response = await request(app)
    
          .post("/api/admin/getAllTourBookings")
          // .send({

          //   name: "Jogging",
    
          //   time: "3:00 PM",
    
          // })
          .set({
    
             Authorization: `Bearer ${token.body.token}`,
            "Content-Type": "application/json",
    
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.status);
  
          expect(response.status).toBe(200);
  
          expect(response.body.booking.length).toBeGreaterThan(0);
    
      });  
  
  });




  // Client unit testing 

  describe("POST get all hotel packages",()=>{

    it("should get all hotel packages", async () => {
    
        const response = await request(app)
    
          .post("/api/user/get-all-hotel-packages")
          
          .set({
            "Content-Type": "application/json",
    
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.status);
  
          expect(response.status).toBe(200);
      
      });  
  
  });

  describe("POST get all guide packages",()=>{

    it("should get all guide packages", async () => {
    
        const response = await request(app)
    
          .post("/api/user/get-all-guide-packages")
          
          .set({
            "Content-Type": "application/json",
    
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.status);
  
          expect(response.status).toBe(200);
          expect(response.body.guidePackages.length).toBeGreaterThan(0);
      
      });  
  
  });

  describe("GET Search no result ",()=>{

    it("should get no search result error code 400", async () => {
    
        const response = await request(app)
    
          .get(`/api/user//searchService?search=${process.env._test_SEARCH_KEYWORD_NO_RESULT}`)
          
          .set({
            "Content-Type": "application/json",
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.body);
          console.log(response.status);
  
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("No matching result");
      
      });  
  
  });

  describe("GET Search  result ",()=>{

    it("should get search result with status code 200", async () => {
    
        const response = await request(app)
    
          .get(`/api/user//searchService?search=${process.env._test_SEARCH_KEYWORD_RESULT}`)
          
          .set({
            "Content-Type": "application/json",
          });
    
          console.log("----------------RESPONSE STATUS------------".red.bold);
          console.log(response.status);
  
          expect(response.status).toBe(200);
          expect(response.body.length).toBeGreaterThan(0);
      
      });  
  
  });