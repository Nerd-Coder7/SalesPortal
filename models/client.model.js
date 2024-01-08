const mongoose = require("mongoose");

const clientSchema= new mongoose.Schema({
    clientName:{ type: String, required: true },
    clientImg:String,
    clientCountry:String,
    clientEmail:String,
    clientSkype:String,
    clientPhone:String,
    invited:Boolean,
    notes:String
});

module.exports = mongoose.model("client",clientSchema);