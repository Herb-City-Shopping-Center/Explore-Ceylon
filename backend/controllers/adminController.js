const ServiceSupplier = require("../models/ServiceSuppliers");
const TourPackage = require("../models/TourPackage")
const HotelPackage = require("../models/HotelPackage")
const asyncHandler = require('express-async-handler');
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

module.exports = {getAllServices,changeServiceStatus,getPackagesByServiceId}