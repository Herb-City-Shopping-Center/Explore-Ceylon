const express = require('express');
const router = express.Router();

const {getAllHotelPackages} = require('../controllers/userController')


router.route("/getAllHotelPackages").post(getAllHotelPackages);


module.exports = router;