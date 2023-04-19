const mongoose = require("mongoose");

//create tour modal
const accommodationCenterSchema = mongoose.Schema(
  {
    userId: { type: "String", required: true },
    userEmail: { type: "String", required: true },
    hotelName: { type: "String", required: true, default: 0 },
    description: { type: "String", required: true, default: 0 },
    location: { type: "String", required: true, default: 0 },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId, // services array
        ref: "Services",
      },
    ],
    centerPic: {
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

const AccommodationCenter = mongoose.model(
  "AccommodationCenter",
  accommodationCenterSchema
);

module.exports = AccommodationCenter;
