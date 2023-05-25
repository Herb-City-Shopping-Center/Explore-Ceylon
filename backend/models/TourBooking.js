const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create tour modal
const tourBookingSchema = mongoose.Schema(
  {
    fname: { type: "String", required: true },
    lname: { type: "String", required: true },
    email: { type: "String", required: true },
    customerPhone: { type: "String", required: true },
    selectedCity: { type: "String", required: true },
    selectedState: { type:"String", required: true },
    country: { type: "String", required: true },
    orderStatus: { type: "String", default:"Pending"},
    customerId: { type: "String", required: true },
    date: { type: Date, required: true },
    packageInfo: { type: Object, required: true },
  },
  {
    timestapms: true,
  }
);

const TourBooking = mongoose.model("TourBooking", tourBookingSchema);

module.exports = TourBooking;
