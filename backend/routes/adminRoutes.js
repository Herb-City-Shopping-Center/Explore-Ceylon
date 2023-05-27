const express = require('express');
const router = express.Router();

const {getAllServices,changeServiceStatus,getPackagesByServiceId,authAdmin,addAdmin,getAllTourBookings} = require('../controllers/adminController');
const { protect } = require("../middleware/authMiddleware");

router.route("/getAllServices").post(protect,getAllServices);
router.route("/changeServiceStatus").post(protect,changeServiceStatus);
router.route("/getPackagesByServiceId").post(protect,getPackagesByServiceId);
router.route("/authAdmin").post(authAdmin);
router.route("/addAdmin").post(addAdmin);
router.route("/getAllTourBookings").post(protect,getAllTourBookings);

module.exports = router;