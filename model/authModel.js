const mongoose = require("mongoose");

// Auth 

const authSchema = new mongoose.Schema({

});

const Auth = mongoose.model('Auth',authSchema);
module.exports = Auth;