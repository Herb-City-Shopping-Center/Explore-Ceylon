const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create tour modal
const tourSchema = mongoose.Schema(
  {
    userId: { type: "String", required: true },
    guideName: { type: "String", required: true },
    packageStatus: { type: "String", default:"active" },
    title: { type: "String", required: true, default: 0 },
    description: { type: "String", required: true, default: 0 },
    type: { type: "String", required: true, default: 0 },
    budget: { type: "String", required: true, default: 0 },
    numberOfDays: { type: "String", required: true, default: 0 },
    destination: { type: "String", required: true, default: 0 },
    numberOfPeoples: { type: "String", required: true, default: 0 },
    numberOfDays: { type: "String", required: true, default: 0 },
    vehicleType: { type: "String", required: true, default: 0 },
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

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
