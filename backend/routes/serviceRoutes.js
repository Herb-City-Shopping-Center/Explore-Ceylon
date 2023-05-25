const express = require('express');
const router = express.Router();

const {registerService,fetchService,fetchPackages,addGuidePackage,updateGuidePackage,getAllHotels,deleteGuidePackage} = require('../controllers/serviceController')

router.route("/register-service").post(registerService);
router.route("/get-service-by-user-id").post(fetchService);
router.route("/get-packages-by-guide-id").post(fetchPackages);
router.route("/add-guide-package").post(addGuidePackage);
router.route("/update-guide-package").post(updateGuidePackage);
router.route("/delete-guide-package").post(deleteGuidePackage);
router.route("/getAllHotels").post(getAllHotels);

module.exports = router;