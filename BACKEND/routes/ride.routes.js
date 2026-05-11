const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require("../controller/ride.contoller");
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    body('vehicleType').isString().isIn(['auto', 'bike', 'car']).withMessage('Invalid vehicle type')
    , rideController.createRide

);

router.get('/get-fare', authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location is required'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    rideController.getFare);



router.post('/confirm', authMiddleware.authCaptain,body('rideId').isMongoId().withMessage('Invalid ride ID'), rideController.confirmRide);

router.get('/start-ride', authMiddleware.authCaptain, query('rideId').isMongoId().withMessage('Invalid ride ID'), query('otp').isString().isLength({ min: 6 }).withMessage('Invalid OTP'),rideController.startRide);

router.post('/end-ride', authMiddleware.authCaptain, query('rideId').isMongoId().withMessage('Invalid ride ID'), rideController.endRide);

module.exports = router;