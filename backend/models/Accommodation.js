const mongoose = require("mongoose");

//create tour modal
const servicessSchema = mongoose.Schema(
  {
    hotelRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccommodationCenter",
    },
    serviceType: { type: "String", required: true, default: 0 }, //accommodation,restaurant,event
    description: { type: "String", required: true, default: 0 },
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

const Services = mongoose.model("Services", servicessSchema);

module.exports = Services;
