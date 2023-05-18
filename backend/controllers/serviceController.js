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

        const package = await TourPackage.create({
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

        if(package){
            res.status(201).json({package});
        }
        else{
            res.status(400);
            throw new error("Failed to publish package!!!");
        }
            
});

// const deleteShop = asyncHandler(async(req,res)=>{

//     const {shopId}=req.body;
//     console.log(shopId);
//     if(!shopId){
//         console.log('Invalid data passes into backend request');
//         return res.sendStatus(400);
//     }else{

//     try {

//         const shop = await Shop.findOneAndDelete({_id:shopId});

//         if(shop){
//             res.status(201).json({
//                 shopId:shopId
//             })
//             console.log('Shop deleted');
//         }
        
//     } catch (error) {
//         res.status(400);
//         throw new error("Error while deleting shop !!!"+error.message);
//     }
// }

// })

const updateGuidePackage = asyncHandler(async(req,res)=>{

    const{shopId,shopName,shopAddress,shopDescription,shopProvince,shopLogo}=req.body;
    console.log(shopId+shopName+shopAddress+shopDescription+shopProvince);

    if(!shopName ||!shopAddress || !shopDescription || !shopProvince || !shopId){
         res.status(400);
        throw new error("Invalid data passes into backend request!!!");
    }
    else{
        const updateShop = await Shop.findByIdAndUpdate(shopId,{
            shopName:shopName,
            shopAddress:shopAddress,
            shopDescription:shopDescription,
            shopProvince:shopProvince,
            shopLogo:shopLogo,
        },
        {
            new: true,
        });


        if(updateShop){
            res.status(201).json({
             _id:updateShop._id,
            shopName:updateShop.shopName,
            shopAddress:updateShop.shopAddress,
            shopDescription:updateShop.shopDescription,
            shopProvince:updateShop.shopProvince,
            shopLogo:updateShop.shopLogo,
            rank:updateShop.rank,
            userId:updateShop.userId,
            token:genarateToken(updateShop._id),
            })

            console.log(updateShop);
        }else{
        res.status(400);
        throw new error("Shop not updated !!!");
    }
    }

});

const fetchService = asyncHandler(async(req,res)=>{

    const{ userId }= req.body;
    console.log("user id "+userId.green.bold);

    const service = await ServiceSupplier.findOne({userId:userId});

 
    if(service){
        res.json({
            service
        });
        console.log(service);
    }else{
        console.log("Error fetching service".red.bold);
        res.status(401);
        throw new error("Error fetching service");
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

module.exports = {registerService,fetchService,fetchPackages,addGuidePackage,updateGuidePackage}