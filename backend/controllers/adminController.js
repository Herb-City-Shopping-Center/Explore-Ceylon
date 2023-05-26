const ServiceSupplier = require("../models/ServiceSuppliers");
const TourPackage = require("../models/TourPackage")
const TourBooking = require("../models/TourBooking")
const HotelPackage = require("../models/HotelPackage")
const Admin = require("../models/Admin");
const asyncHandler = require('express-async-handler');
const genarateToken = require("../config/genarateToken");
const { green } = require('colors');

const getAllServices = asyncHandler(async(req,res)=>{

    const services = await ServiceSupplier.find();
    
        if(services){
            res.json({
                services
            });
        }else{
            console.log("Error fetching services".red.bold);
            res.status(401);
            throw new error("Error fetching services");
        }
});

const changeServiceStatus = asyncHandler(async(req,res)=>{

    const {serviceId,updateStatus} = req.body;
    console.log(serviceId,updateStatus);

    if(!serviceId){
        res.status(400);
       throw new error("Invalid data passes into backend request!!!");
   }
   else{
       const updateService = await ServiceSupplier.findByIdAndUpdate(serviceId,{
        serviceStatus:updateStatus,
       },
       {
           new: true,
       });


       if(updateService){
           res.status(201).json({
            updateService
           })

           console.log(updateService);
       }else{
       res.status(400);
       throw new error("Service not updated !!!");
   }
   }
})

const getPackagesByServiceId = asyncHandler(async(req,res)=>{

    console.log("Fetch packages".red.bold);

        const{ serviceId,serviceCode }= req.body;
        console.log(serviceId,serviceCode);

        var packages = null;
        if(serviceCode==1){
            packages = await HotelPackage.find({ serviceId: { $in: serviceId } });
        }
        else{
            packages = await TourPackage.find({ serviceId: { $in: serviceId } })
        }
    
    
        if(packages){
            res.json({
                packages
            });
            console.log(packages);
        }else{
            console.log("Error fetching packages".red.bold);
            res.status(401);
            throw new error("Error fetching packages");
        }
})

//user authenticate
const authAdmin = asyncHandler(async (req, res) => {
  
    //getting body data
    const { userName, password } = req.body;
  
    console.log(userName,password);
    //check if user available in database
    const admin = await Admin.findOne({ userName });
    if(!userName){
      return res.status(400).send({ message: "Invalid User Name" });
    }
    if (!(await admin.matchPassword(password)))
      return res.status(400).send({ message: "Incorrect Password " });
  
  
    //if user available send response with matching password and genarate JWT token using user id
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        userName: admin.userName,
        token: genarateToken(admin._id),
      });
    } else {
      //send error message to frontend
      console.log("Invalid user name or Password".red.bold);
      res.status(400).json({
        error: "Incorrect password !!!",
      });
      throw new error("Incorrect password !!!");
    }
  });

const addAdmin = asyncHandler(async (req, res) => {
    //getting body data
    const { userName, password} = req.body;
    console.log(userName,password);
  
    //backend validation for body data
    if (!userName || !password) {
      res.send(400);
      throw new error("Please enter all the fields!!!");
    }
  
    //find if user exist with email and user name
    const adminExist = await Admin.findOne({ userName });
  
    //sending error message if user exist
    if (adminExist) {
      console.log("Admin already exist!!!".red.bold);
      res.status(400).json({
        error: "Admin already exist !!!",
      });
      throw new error("Admin already exist!!!");
    }
  
    //create new user in database
    const admin = await Admin.create({
      userName,
      password,
    });
  
    //send response to frontend
    if (admin) {
      console.log("Registered!!!".green.bold);
      res.status(201).json({
        _id: admin._id,
        userName: admin.userName,
        token: genarateToken(admin._id),
      });
    } else {
      //send error message to frontend
      console.log("Failed to Register Admin !!!".red.bold);
      res.status(400).json({
        error: "Failed to Register Admin !!!",
      });
      throw new error("Failed to Register Admin !!!");
    }
  });

const getAllTourBookings = asyncHandler(async(req,res)=>{

    const booking = await TourBooking.find();
    
        if(booking){
            res.json({
              booking
            });
        }else{
            console.log("Error fetching bookings".red.bold);
            res.status(401);
            throw new error("Error fetching bookings");
        }
});


module.exports = {getAllServices,changeServiceStatus,getPackagesByServiceId,authAdmin,addAdmin,getAllTourBookings}