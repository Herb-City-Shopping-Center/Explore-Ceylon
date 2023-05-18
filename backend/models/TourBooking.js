const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create tour modal
const tourBookingSchema = mongoose.Schema(
  {
    customerEmail: { type: "String", required: true },
    customerName: { type: "String", required: true },
    customerPhone: { type: "String", required: true },
    paymentType: { type: "String", required: true },
    pickupLocation: { type: "String", required: true },
    date: { type:"String", required: true },
    tourPackageId: { type: "String", required: true },
    guideName: { type: "String", required: true },
    packageStatus: { type: "String", default: "active" },
    title: { type: "String", required: true, default: "0" },
    description: { type: "String", required: true, default: "0" },
    type: { type: "String", required: true, default: "0" },
    budget: { type: "String", required: true, default: "0" },
    numberOfDays: { type: "String", required: true, default: "0" },
    destination: { type: "String", required: true, default: "0" },
    numberOfPeoples: { type: "String", required: true, default: "0" },
    numberOfDays: { type: "String", required: true, default: "0" },
    vehicleType: { type: "String", required: true, default: "0" },
    review: { type: "String", default: "0" },
    accommodations: [
      {
        type: mongoose.Schema.Types.ObjectId, // accommodationusers array
        ref: "AccommodationCenters",
      },
    ],
    EventsAndActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
      },
    ],

    displayPic: {
      type: "String",
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestapms: true,
  }
);

const TourBooking = mongoose.model("TourBooking", tourBookingSchema);

module.exports = TourBooking;
