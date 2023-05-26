const ServiceSupplier = require("../models/ServiceSuppliers");
const TourPackage = require("../models/TourPackage")
const asyncHandler = require('express-async-handler');
const { green } = require('colors');


const registerService = asyncHandler( async(req,res)=>{

    const{
        userId,
        serviceName,
        serviceDescription,
        serviceLocation,
        contact,
        serviceType,
        serviceCode,
        profileImage,
        }=req.body;
        console.log(userId,
            serviceName,
            serviceDescription,
            serviceLocation,
            contact,
            serviceType,
            serviceCode,
            profileImage,);

    if(!userId || !serviceName || !serviceDescription || !serviceLocation || !contact || !serviceType || !serviceCode ||!profileImage){

        console.log("All data not received".red.bold);
        res.status(400);
        throw new error("Please fill all the fields!!!");

    }

    const serviceExist = await ServiceSupplier.findOne({userId:{$in:userId}});

    if(serviceExist){
        console.log("Service already exist !!!".red.bold);
        res.status(400);
        throw new error(error.message);
    }
    else{

        const service = await ServiceSupplier.create({
            userId,
            serviceName,
            serviceDescription,
            serviceLocation,
            contact,
            serviceType,
            serviceCode,
            profileImage,
        });

        if(service){
            res.status(201).json({service});
        }
        else{
            res.status(400);
            throw new error("Failed to register service!!!");
        }
            
    }

});

const addGuidePackage = asyncHandler( async(req,res)=>{

    const{
        serviceId,
            guideName,
            packageTitle,
            description,
            budget,
            numberOfDays,
            destination,
            numberOfPeoples,
            vehicleType,
            accommodations,
            displayPic,
        }=req.body;

    console.log(
        serviceId,
        guideName,
        packageTitle,
        description,
        budget,
        numberOfDays,
        destination,
        numberOfPeoples,
        vehicleType,
        accommodations,
        displayPic,
        );

    if(!serviceId || !guideName || !packageTitle || !description || !budget || !numberOfDays || !destination ||!numberOfPeoples||!vehicleType||!accommodations||!displayPic){

        console.log("All data not received".red.bold);
        res.status(400);
        throw new error("Please fill all the fields!!!");

    }

        const packages = await TourPackage.create({
            serviceId,
            guideName,
            packageTitle,
            description,
            budget,
            numberOfDays,
            destination,
            numberOfPeoples,
            vehicleType,
            accommodations,
            displayPic,
        });

        if(packages){
            res.status(201).json({packages});
        }
        else{
            res.status(400);
            throw new error("Failed to publish package!!!");
        }
            
});

const deleteGuidePackage = asyncHandler(async(req,res)=>{

    const {id}=req.body;
    console.log(id);
    if(!id){
        console.log('Invalid data passes into backend request');
        return res.sendStatus(400);
    }else{

    try {

        const packages = await TourPackage.findOneAndDelete({_id:id});

        if(packages){
            res.status(201).json({
                packageId:id
            })
            console.log('Package deleted');
        }
        
    } catch (error) {
        res.status(400);
        throw new error("Error while deleting package !!!"+error.message);
    }
}

})

const updateGuidePackage = asyncHandler(async(req,res)=>{

    const{_id,
        guideName,
        packageTitle,
        description,
        budget,
        numberOfDays,
        destination,
        numberOfPeoples,
        vehicleType,
        accommodations,
        displayPic,}=req.body;

    console.log(_id,
        guideName,
        packageTitle,
        description,
        budget,
        numberOfDays,
        destination,
        numberOfPeoples,
        vehicleType,
        accommodations,
        displayPic,);

    if(!_id ||!packageTitle || !description || !budget || !destination){
         res.status(400);
        throw new error("Invalid data passes into backend request!!!");
    }
    else{
        const updatePackage = await TourPackage.findByIdAndUpdate(_id,{
            guideName:guideName,
            packageTitle:packageTitle,
            description:description,
            budget:budget,
            numberOfDays:numberOfDays,
            destination:destination,
            numberOfPeoples:numberOfPeoples,
            vehicleType:vehicleType,
            accommodations:accommodations,
            displayPic:displayPic,
        },
        {
            new: true,
        });


        if(updatePackage){
            res.status(201).json({
             updatePackage
            })

            console.log(updatePackage);
        }else{
        res.status(400);
        throw new error("Package not updated !!!");
    }
    }

});

const fetchService = asyncHandler(async(req,res)=>{
console.log("Fetch shop".red.bold);
    const{ userId }= req.body;
    console.log(userId);
    const service = await ServiceSupplier.findOne({userId:userId});


    if(service){
        res.json({
            service
        });
        console.log(service);
    }else{
        console.log("Error fetching shop".red.bold);
        res.status(401);
        throw new error("Error fetching shop");
    }
});

const fetchPackages = asyncHandler(async (req, res) => {
    
    const { serviceId } = req.body;
    console.log(serviceId + " service Id");
    const packages = await TourPackage.find({ serviceId: { $in: serviceId } });
    
    if (packages) {
        res.send(packages);
        console.log(packages);
    } else {
        console.log("Invalid serviceId for fetch packages".red.bold);
        res.status(401);
        throw new error("Invalid serviceId for fetch packages");
    }
});

const getAllHotels = asyncHandler(async(req,res)=>{


    const hotels = await ServiceSupplier.find({ serviceCode: { $in: 1 } });
    
        if(hotels){
            res.json({
                hotels
            });
        }else{
            console.log("Error fetching Hotels".red.bold);
            res.status(401);
            throw new error("Error fetching Hotels");
        }
});


module.exports = {registerService,fetchService,fetchPackages,addGuidePackage,updateGuidePackage,getAllHotels,deleteGuidePackage}