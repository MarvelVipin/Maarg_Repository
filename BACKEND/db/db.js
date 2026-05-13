const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to the DB successfully");
        })
        .catch((err) => {
            console.log("Error connecting to the DB", err);
        });
}

module.exports = connectToDb;