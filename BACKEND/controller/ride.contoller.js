const rideService = require("../services/ride.service");
const { validationResult } = require('express-validator');
const mapService = require("../services/maps.service");
const { sendMessageToSocket, sendMessageToSocketId } = require("../socket")

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        

         res.status(201).json(ride);

         const  pickupCoordinates = await mapService.getCoordinates(pickup);

         console.log( pickupCoordinates);
        const captainInRadius = await mapService.getCaptainInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2000);

        ride.otp = "";
        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: ride  
            });
        })
        console.log(captainInRadius);
    } catch (error) {
        next(error);
    }
};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};