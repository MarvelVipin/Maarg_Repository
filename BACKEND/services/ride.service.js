const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");

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
        auto: baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto,
        bike: baseFare.bike + (distanceTime.distance.value / 1000) * perKmRate.bike + (distanceTime.duration.value / 60) * perMinuteRate.bike,
        car: baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car,
    }
    return fare;
}

function getOtp(num){
    function generateOTP(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOTP(6);
}

module.exports.createRide = async ( { userId, pickup, destination, vehicleType} ) =>{
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user: userId,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
});

    return ride;
};