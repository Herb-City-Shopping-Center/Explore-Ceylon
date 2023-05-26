const mongoose = require("mongoose");

//create tour modal
const tourSchema = mongoose.Schema(
  {
    serviceId: { type: "String", required: true },
    guideName: { type: "String", required: true },
    packageStatus: { type: "String", default:"active" },//mnee to add in backend
    packageTitle: { type: "String", required: true, default: 0 },
    description: { type: "String", required: true, default: 0 },
    budget: { type: "String", required: true, default: 0 },
    numberOfDays: { type: "String", required: true, default: 0 },
    destination: { type: "String", required: true, default: 0 },
    numberOfPeoples: { type: "String", required: true, default: 0 },
    vehicleType: { type: "String", required: true, default:"Van"},
    feedback: [{type:"String"}],
    accommodations:{type: Object},//add type as mongo object
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

const TourPackage = mongoose.model("TourPackage", tourSchema);

module.exports = TourPackage;
