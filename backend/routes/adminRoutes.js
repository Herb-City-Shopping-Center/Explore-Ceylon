const express = require('express');
const router = express.Router();

const {getAllServices,changeServiceStatus,getPackagesByServiceId} = require('../controllers/adminController')

router.route("/getAllServices").post(getAllServices);
router.route("/changeServiceStatus").post(changeServiceStatus);
router.route("/getPackagesByServiceId").post(getPackagesByServiceId);

module.exports = router;