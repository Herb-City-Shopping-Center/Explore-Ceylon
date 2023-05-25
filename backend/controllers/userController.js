const ServiceSupplier = require("../models/ServiceSuppliers");
const TourPackage = require("../models/TourPackage");
const HotelPackage = require("../models/HotelPackage")
const TourBooking = require("../models/TourBooking")
const Admin = require("../models/Admin");
const asyncHandler = require('express-async-handler');
const genarateToken = require("../config/genarateToken");
const { green } = require('colors');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const getAllHotelPackages = asyncHandler(async(req,res)=>{

    const hotelServices = await HotelPackage.find();
    
        if(hotelServices){
            res.json({
                hotelServices
            });
        }else{
            console.log("Error fetching Hotel Services".red.bold);
            res.status(401);
            throw new error("Error fetching Hotel Services");
        }
});

const getAllGuidePackages = asyncHandler(async(req,res)=>{


  const guidePackages = await TourPackage.find().sort({budget:-1});
  
      if(guidePackages){
          res.json({
            guidePackages
          });
      }else{
          console.log("Error fetching Guide Services".red.bold);
          res.status(401);
          throw new error("Error fetching Guide Services");
      }
});

const checkOut = asyncHandler(async (req, res) => {
  const { items } = req.body;
  console.log(items);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        // const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "lkr",
            product_data: {
              name: item.packageTitle,
            },
            unit_amount: item.budget
              ? Number(item.budget) * 100
              : Number(item.budget) * 100,
          },
          quantity: 1,
        };
      }),

      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      success_url: "http://localhost:3000/order/review",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const placeOrder = asyncHandler(async(req,res)=>{

  const {addressInfo,packageInfo} = req.body;

  const fname = addressInfo.fname;
  const lname = addressInfo.lname;
  const email = addressInfo.email;
  const customerPhone = addressInfo.customerPhone;
  const selectedCity = addressInfo.selectedCity;
  const selectedState = addressInfo.selectedState;
  const country = addressInfo.country;
  const customerId = addressInfo.customerId;
  const date = addressInfo.date;

  if(!addressInfo || !packageInfo){

    console.log("All data not received".red.bold);
    res.status(400);
    throw new error("Please fill all the fields!!!");

}


    const booking = await TourBooking.create({
      fname,
      lname,
      email,
      customerPhone,
      selectedCity,
      selectedState,
      country,
      customerId,
      date,
      packageInfo,
  });

  if(booking){
      res.status(201).json({booking});
  }
  else{
      res.status(400);
      throw new error("Failed to publish package!!!");
  }


});

const searchService = asyncHandler(async (req, res) => {
  //getting keyword
  const keyword = req.query.search
    ? {
        $or: [
          { packageTitle: { $regex: req.query.search, $options: "i" } }, //assign keyword find in packageTitle
          { description: { $regex: req.query.search, $options: "i" } }, //assign keyword find in description
          { destination: { $regex: req.query.search, $options: "i" } }, //assign keyword find destination
        ],
      }
    : {};

  //find user in databse by keyword
  const service = await TourPackage.find(keyword);
  console.log(service);
  //send data to frontend
  res.send(service);
});


const getBookingsByUserId = asyncHandler(async(req,res)=>{

    console.log("Fetch packages".red.bold);

        const{ userId }= req.body;
        console.log(userId);

        
        bookings = await TourBooking.find({ customerId: { $in: userId } })
        
    
    
        if(bookings){
            res.json({
              bookings
            });
            console.log(bookings);
        }else{
            console.log("Error fetching packages".red.bold);
            res.status(401);
            throw new error("Error fetching packages");
        }
})


module.exports = {getAllHotelPackages,getAllGuidePackages,checkOut,placeOrder,searchService,getBookingsByUserId}