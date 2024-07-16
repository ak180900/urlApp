const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema ({
    shortendURL: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visited: [ { timestamp: {type: Number}} ],
    createdBy: {
        type: String,
        required: true,
        // ref: "users",
    }
    },
    { timestamp: true },
    
); 

const URL = mongoose.model('url', urlSchema);

module.exports = URL;