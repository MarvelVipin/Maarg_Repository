const userModel = require('../models/users.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blacklistToken.model.js');
const captainModel = require('../models/captain.model.js');
const authMiddleware = require ('../middlewares/auth.middleware')

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: "Access denied. No token provided."});
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({token});
    if (isBlacklisted) {
        return res.status(401).json({message: "Access denied. Token is blacklisted."});
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
}



module.exports.authCaptain = async (req, res, next) => {
    console.log("AUTH HEADER:", req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Access denied. Token is blacklisted." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id);

        
        if (!captain) {
            return res.status(401).json({ message: "Captain not found" });
        }

        
        req.captain = captain;

        next();
    } catch (error) {
        console.log(error); 
        return res.status(401).json({ message: "unauthorized" });
    }
}