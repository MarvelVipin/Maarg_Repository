const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 50,
        bike: 30,
        car: 100
    };
    const perKmRate = {
        auto: 10,
        bike: 5,
        car: 20
    };

    const perMinuteRate = {
        auto: 5,
        bike: 2,
        car: 10
    };

    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto),
        bike: Math.round(baseFare.bike + (distanceTime.distance.value / 1000) * perKmRate.bike + (distanceTime.duration.value / 60) * perMinuteRate.bike),
        car: Math.round(baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car),
    }
    return fare;
}

module.exports.getFare = getFare;

function getOtp(num){
    function generateOTP(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOTP(6);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) =>{
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user: user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
});

    return ride;
};

module.exports.confirmRide = async ({rideId, captain}) => {
    if (!rideId || !captain) {
        throw new Error("Ride ID and Captain ID are required");
    }

    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: "confirmed",
         captain:captain._id
    });

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain');

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.captain) {
        throw new Error("Ride already confirmed");
    }

    return ride;
};