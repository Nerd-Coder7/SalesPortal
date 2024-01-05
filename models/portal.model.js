const mongoose = require("mongoose");

const portalSchema = new mongoose.Schema({
    portalName:{ type: String, required: true },
    link:{ type: String, required: true },
});

module.exports = mongoose.model("portal", portalSchema);