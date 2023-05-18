const mongoose = require("mongoose");

//create tour modal
const serviceSupplierSchema = mongoose.Schema(
  {
    userId: { type: "String", required: true },
    serviceName: { type: "String", required: true },
    // serviceEmail: { type: "String", required: true },
    serviceDescription: { type: "String", required: true },
    serviceLocation: { type: "String", required: true},
    contact: { type: "String", required: true },
    serviceType: { type: "String", required: true },
    serviceCode: { type: "Number", required: true },//0 for guide 1 for hotel
    serviceStatus: { type: "Number", default:1 },
    feedbacks: [ {type: "String"} ],
    noOfBookings: { type: "Number", default:0 },
    paymentDue: { type: "Number", default:0 },
    profileImage: {
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

const ServiceSupplier = mongoose.model("ServiceSupplier",serviceSupplierSchema);

module.exports = ServiceSupplier;
