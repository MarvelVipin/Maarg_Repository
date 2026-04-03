const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const rideController = require("../controller/ride.contoller");
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup location is required'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['auto', 'bike', 'car']).withMessage('Invalid vehicle type')
    , rideController.createRide

);

module.exports = router;