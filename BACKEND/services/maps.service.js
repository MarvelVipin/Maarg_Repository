const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json"
            },
            headers: {
                "User-Agent": "my-app"
            } 
        }
    );

    if (!res.data.length) {
        throw new Error("Location not found");
    }

    return {
    lat: parseFloat(res.data[0].lat),
    lng: parseFloat(res.data[0].lon)
}
}

module.exports.getDistanceTime = async (pickup, destination) => {
    try {
        const originCoords = await module.exports.getAddressCoordinate(pickup);
        const destCoords = await module.exports.getAddressCoordinate(destination);
        console.log(originCoords);
console.log(destCoords);

        const routeRes = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}`,
            {
                params: { overview: "false" }
            }
        );

        if (!routeRes.data.routes.length) {
            throw new Error("No route found");
        }

        const route = routeRes.data.routes[0];

        return {
            distance: { value: route.distance },   
            duration: { value: route.duration }    
        };

    } catch (err) {
        console.error("OSM ERROR:", err.message);
        throw new Error("Unable to fetch distance and time");
    }
};

module.exports.getSuggestions = async (input) => {
    const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: input,
                format: "json",
                limit: 5
            },
            headers: {
                "User-Agent": "my-app"
            }
        }
    );

    return res.data;
};


module.exports.getCaptainInRadius = async (lat, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });

    return captains;
};