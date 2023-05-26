const express = require('express');
const router = express.Router();

const {getAllHotelPackages,getAllGuidePackages,checkOut,placeOrder,searchService,getBookingsByUserId,addFeedbackTourBooking,changeBookingStatus} = require('../controllers/userController')


router.route("/get-all-hotel-packages").post(getAllHotelPackages);
router.route("/get-all-guide-packages").post(getAllGuidePackages);
router.route("/payment/create-checkout-session").post(checkOut);
router.route("/placeOrder").post(placeOrder);
router.route("/searchService").get(searchService);
router.route("/getBookingsByUserId").post(getBookingsByUserId);
router.route("/feedback/add-feedback-booking").post(addFeedbackTourBooking);
router.route("/changeBookingStatus").post(changeBookingStatus);


module.exports = router;