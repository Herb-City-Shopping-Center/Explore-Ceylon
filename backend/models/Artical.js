const mongoose = require("mongoose");

const articalSchema = mongoose.Schema(
  {
    pic: { type: "String", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    lat: { type: "String", required: true },
    lng: { type: "String", required: true },
   
  },
  {
    timestapms: true,
  }
);


const Artical = mongoose.model("Artical", articalSchema);

module.exports = Artical;
