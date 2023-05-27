const mongoose = require("mongoose");

//create tour modal
const hotelSchema = mongoose.Schema(
  {
    serviceId: { type: "String", required: true },
    hotelName: { type: "String", required: true },
    packageStatus: { type: "String", default:"active" },//mnee to add in backend
    packageTitle: { type: "String", required: true, default: 0 },
    description: { type: "String", required: true, default: 0 },
    budget: { type: "String", required: true, default: 0 },
    numberOfDays: { type: "String", required: true, default: 0 },
    numberOfPeoples: { type: "String", required: true, default: 0 },
    accommodationType: { type: "String", required: true, default:"non A/C" },
    feedback: [{tyep:"String"}],
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

const HotelPackage = mongoose.model("HotelPackage", hotelSchema);

module.exports = HotelPackage;
